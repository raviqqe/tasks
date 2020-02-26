import "firebase/firestore";
import firebase from "firebase/app";
import { isEqual } from "lodash";
import { ITask } from "../../domain/task";
import { ITodoTaskRepository } from "../../application/todo-task-repository";

export class FirestoreTodoTaskRepository implements ITodoTaskRepository {
  public async create(projectId: string, task: ITask): Promise<void> {
    await this.tasksCollection(projectId)
      .doc(task.id)
      .set(task);

    await this.reorder(projectId, [
      task.id,
      ...(await this.getOrder(projectId))
    ]);
  }

  public async delete(projectId: string, taskId: string): Promise<void> {
    await this.tasksCollection(projectId)
      .doc(taskId)
      .delete();

    await this.reorder(
      projectId,
      (await this.getOrder(projectId)).filter(id => id !== taskId)
    );
  }

  public async list(projectId: string): Promise<ITask[]> {
    const tasks: ITask[] = (
      await this.tasksCollection(projectId).get()
    ).docs.map(snapshot => snapshot.data() as ITask);
    const taskMap = Object.fromEntries(tasks.map(task => [task.id, task]));
    const taskIds: string[] = await this.getOrder(projectId);
    const taskIdSet = new Set<string>(taskIds);

    const restoredTasks: ITask[] = [
      ...tasks.filter(task => !taskIdSet.has(task.id)),
      ...taskIds.map(id => taskMap[id]).filter(task => !!task)
    ];
    const restoredTaskIDs: string[] = restoredTasks.map(task => task.id);

    if (!isEqual(taskIds, restoredTaskIDs)) {
      await this.reorder(projectId, restoredTaskIDs);
    }

    return restoredTasks;
  }

  public async reorder(projectId: string, taskIds: string[]): Promise<void> {
    await this.order(projectId).set({ order: taskIds });
  }

  public async update(projectId: string, task: ITask): Promise<void> {
    await this.tasksCollection(projectId)
      .doc(task.id)
      .update(task);
  }

  private async getOrder(projectId: string): Promise<string[]> {
    const data = (await this.order(projectId).get()).data();
    return data ? data.order : [];
  }

  private tasksCollection(
    projectId: string
  ): firebase.firestore.CollectionReference {
    return this.project(projectId).collection("todoTasks");
  }

  private order(projectId: string): firebase.firestore.DocumentReference {
    return this.project(projectId)
      .collection("todoTaskOrders")
      .doc("default");
  }

  private project(projectId: string): firebase.firestore.DocumentReference {
    const user = firebase.auth().currentUser;

    if (!user) {
      throw new Error("user not authenticated");
    }

    return firebase
      .firestore()
      .collection("version/1/users")
      .doc(user.uid)
      .collection("projects")
      .doc(projectId);
  }
}
