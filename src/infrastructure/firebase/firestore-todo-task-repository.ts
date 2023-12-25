import { compact, deepEqual } from "@raviqqe/loscore";
import { type FirebaseApp } from "firebase/app";
import { type Auth, getAuth } from "firebase/auth";
import {
  collection,
  type CollectionReference,
  doc,
  type DocumentReference,
  type Firestore,
  getDocs,
  getFirestore,
  runTransaction,
  type Transaction,
  updateDoc,
} from "firebase/firestore";
import { type TodoTaskRepository } from "../../application/todo-task-repository.js";
import { type Task } from "../../domain/task.js";

interface OrderDocument {
  order: string[];
}

export class FirestoreTodoTaskRepository implements TodoTaskRepository {
  private readonly auth: Auth;
  private readonly firestore: Firestore;

  constructor(app: FirebaseApp) {
    this.auth = getAuth(app);
    this.firestore = getFirestore(app);
  }

  public async create(projectId: string, task: Task): Promise<void> {
    await runTransaction(this.firestore, async (transaction) => {
      const taskIds = await this.getOrder(projectId, transaction);

      transaction.set(doc(this.tasks(projectId), task.id), task);
      this.setOrder(projectId, [task.id, ...taskIds], transaction);
    });
  }

  public async delete(projectId: string, taskId: string): Promise<void> {
    await runTransaction(this.firestore, async (transaction) => {
      const taskIds = await this.getOrder(projectId, transaction);

      transaction.delete(doc(this.tasks(projectId), taskId));
      this.setOrder(
        projectId,
        taskIds.filter((id) => id !== taskId),
        transaction,
      );
    });
  }

  public async list(projectId: string): Promise<Task[]> {
    return runTransaction(this.firestore, async (transaction) => {
      // TODO Use CollectionReference.prototype.getAll().
      // https://github.com/firebase/firebase-js-sdk/issues/1176
      const tasks: Task[] = (await getDocs(this.tasks(projectId))).docs.map(
        (snapshot) => snapshot.data(),
      );
      const taskMap = Object.fromEntries(tasks.map((task) => [task.id, task]));
      const taskIds = await this.getOrder(projectId, transaction);

      // Start of read consistency resolution
      const taskIdSet = new Set(taskIds);

      const restoredTasks: Task[] = [
        ...tasks.filter((task) => !taskIdSet.has(task.id)),
        ...compact(taskIds.map((id) => taskMap[id])),
      ];
      const restoredTaskIds: string[] = restoredTasks.map((task) => task.id);

      if (!deepEqual(taskIds, restoredTaskIds)) {
        this.setOrder(projectId, restoredTaskIds, transaction);
      }
      // End of read consistency resolution

      return restoredTasks;
    });
  }

  public async reorder(projectId: string, taskIds: string[]): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/require-await
    await runTransaction(this.firestore, async (transaction) =>
      this.setOrder(projectId, taskIds, transaction),
    );
  }

  public setOrder(
    projectId: string,
    taskIds: string[],
    transaction: Transaction,
  ): void {
    transaction.set(this.order(projectId), { order: taskIds });
  }

  public async update(projectId: string, task: Task): Promise<void> {
    await updateDoc(doc(this.tasks(projectId), task.id), { ...task });
  }

  private async getOrder(
    projectId: string,
    transaction: Transaction,
  ): Promise<string[]> {
    return (await transaction.get(this.order(projectId))).data()?.order ?? [];
  }

  private tasks(projectId: string): CollectionReference<Task> {
    return collection(
      this.project(projectId),
      "todoTasks",
    ) as CollectionReference<Task>;
  }

  private order(projectId: string): DocumentReference<OrderDocument> {
    return doc(
      this.project(projectId),
      "todoTaskOrders/default",
    ) as DocumentReference<OrderDocument>;
  }

  private project(projectId: string): DocumentReference {
    const user = this.auth.currentUser;

    if (!user) {
      throw new Error("user not authenticated");
    }

    return doc(
      this.firestore,
      `version/1/users/${user.uid}/projects/${projectId}`,
    );
  }
}
