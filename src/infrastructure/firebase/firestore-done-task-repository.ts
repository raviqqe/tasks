import { type FirebaseApp } from "firebase/app";
import { type Auth, getAuth } from "firebase/auth";
import {
  collection,
  type CollectionReference,
  doc,
  type Firestore,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  type Query,
  setDoc,
  startAfter,
} from "firebase/firestore/lite";
import { type DoneTaskRepository } from "../../application/done-task-repository.js";
import { type Task } from "../../domain/task.js";
import { last } from "es-toolkit";

interface TimestampedTask extends Task {
  createdAt: number;
}

const batchSize = 20;

export class FirestoreDoneTaskRepository implements DoneTaskRepository {
  private readonly auth: Auth;
  private readonly firestore: Firestore;

  constructor(app: FirebaseApp) {
    this.auth = getAuth(app);
    this.firestore = getFirestore(app);
  }

  public async create(projectId: string, task: Task): Promise<void> {
    await setDoc(doc(this.collection(projectId), task.id), {
      ...task,
      createdAt: Math.floor(Date.now() / 1000), // Unix timestamp
    });
  }

  public async *list(projectId: string): AsyncIterable<Task[]> {
    let snapshot = await getDocs(
      query(this.query(projectId), limit(batchSize)),
    );

    while (snapshot.docs.length > 0) {
      yield snapshot.docs.map((snapshot) => snapshot.data() as Task);

      snapshot = await getDocs(
        query(
          this.query(projectId),
          startAfter(last(snapshot.docs)),
          limit(batchSize),
        ),
      );
    }
  }

  private query(projectId: string): Query {
    return query(this.collection(projectId), orderBy("createdAt", "desc"));
  }

  private collection(projectId: string): CollectionReference<TimestampedTask> {
    const user = this.auth.currentUser;

    if (!user) {
      throw new Error("user not authenticated");
    }

    return collection(
      this.firestore,
      `version/1/users/${user.uid}/projects/${projectId}/doneTasks`,
    ) as CollectionReference<TimestampedTask>;
  }
}
