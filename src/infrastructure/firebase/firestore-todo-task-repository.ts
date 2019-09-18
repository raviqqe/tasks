import "firebase/firestore";
import firebase from "firebase/app";
import { ITask } from "../../domain/task";
import { ITodoTaskRepository } from "../../application/todo-task-repository";

export class FirestoreTodoTaskRepository implements ITodoTaskRepository {
  public async create(projectID: string, task: ITask): Promise<void> {
    await this.tasksCollection(projectID)
      .doc(task.id)
      .set(task);

    await this.order(projectID).set({
      order: [task.id, ...(await this.getOrder(projectID))]
    });
  }

  public async delete(projectID: string, taskID: string): Promise<void> {
    await this.tasksCollection(projectID)
      .doc(taskID)
      .delete();

    await this.order(projectID).set({
      order: (await this.getOrder(projectID)).filter(id => id !== taskID)
    });
  }

  public async list(projectID: string): Promise<ITask[]> {
    const tasks: Record<string, ITask> = Object.fromEntries(
      (await this.tasksCollection(projectID).get()).docs
        .map(snapshot => snapshot.data() as ITask)
        .map(task => [task.id, task])
    );

    return (await this.getOrder(projectID)).map(id => tasks[id]);
  }

  public async reorder(projectID: string, taskIDs: string[]): Promise<void> {
    await this.order(projectID).set(taskIDs);
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
