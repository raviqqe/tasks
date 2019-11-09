import "firebase/firestore";
import firebase from "firebase/app";
import { isEqual } from "lodash";
import { ITask } from "../../domain/task";
import { ITodoTaskRepository } from "../../application/todo-task-repository";

export class FirestoreTodoTaskRepository implements ITodoTaskRepository {
  public async create(projectID: string, task: ITask): Promise<void> {
    await this.tasksCollection(projectID)
      .doc(task.id)
      .set(task);

    await this.reorder(projectID, [
      task.id,
      ...(await this.getOrder(projectID))
    ]);
  }

  public async delete(projectID: string, taskID: string): Promise<void> {
    await this.tasksCollection(projectID)
      .doc(taskID)
      .delete();

    await this.reorder(
      projectID,
      (await this.getOrder(projectID)).filter(id => id !== taskID)
    );
  }

  public async list(projectID: string): Promise<ITask[]> {
    const tasks: ITask[] = (
      await this.tasksCollection(projectID).get()
    ).docs.map(snapshot => snapshot.data() as ITask);
    const taskMap: Map<string, ITask> = new Map(
      tasks.map(task => [task.id, task])
    );
    const taskIDs: string[] = await this.getOrder(projectID);
    const taskIDSet = new Set<string>(taskIDs);

    const restoredTasks: ITask[] = [
      ...tasks.filter(task => !taskIDSet.has(task.id)),
      ...taskIDs
        .map(id => taskMap.get(id))
        .filter((task): task is ITask => !!task)
    ];
    const restoredTaskIDs: string[] = restoredTasks.map(task => task.id);

    if (!isEqual(taskIDs, restoredTaskIDs)) {
      await this.reorder(projectID, restoredTaskIDs);
    }

    return restoredTasks;
  }

  public async reorder(projectID: string, taskIDs: string[]): Promise<void> {
    await this.order(projectID).set({ order: taskIDs });
  }

  public async update(projectID: string, task: ITask): Promise<void> {
    await this.tasksCollection(projectID)
      .doc(task.id)
      .update(task);
  }

  private async getOrder(projectID: string): Promise<string[]> {
    const data = (await this.order(projectID).get()).data();
    return data ? data.order : [];
  }

  private tasksCollection(
    projectID: string
  ): firebase.firestore.CollectionReference {
    return this.project(projectID).collection("todoTasks");
  }

  private order(projectID: string): firebase.firestore.DocumentReference {
    return this.project(projectID)
      .collection("todoTaskOrders")
      .doc("default");
  }

  private project(projectID: string): firebase.firestore.DocumentReference {
    const user = firebase.auth().currentUser;

    if (!user) {
      throw new Error("user not authenticated");
    }

    return firebase
      .firestore()
      .collection("version/1/users")
      .doc(user.uid)
      .collection("projects")
      .doc(projectID);
  }
}
