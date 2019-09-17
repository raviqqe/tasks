import "firebase/firestore";
import firebase from "firebase/app";
import { ITask } from "../../domain/task";
import { ITodoTaskRepository } from "../../application/todo-task-repository";

export class FirestoreTodoTaskRepository implements ITodoTaskRepository {
  public async create(projectID: string, task: ITask): Promise<void> {
    await this.tasksCollection(projectID)
      .doc(task.id)
      .set(task);
  }

  public async delete(projectID: string, taskID: string): Promise<void> {
    await this.tasksCollection(projectID)
      .doc(taskID)
      .delete();
  }

  public async list(projectID: string): Promise<ITask[]> {
    const tasks: Record<string, ITask> = Object.fromEntries(
      (await this.tasksCollection(projectID).get()).docs
        .map(snapshot => snapshot.data() as ITask)
        .map(task => [task.id, task])
    );

    return ((await this.order(projectID).get()).data() as string[]).map(
      id => tasks[id]
    );
  }

  public async update(projectID: string, task: ITask): Promise<void> {
    await this.tasksCollection(projectID)
      .doc(task.id)
      .update(task);
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
