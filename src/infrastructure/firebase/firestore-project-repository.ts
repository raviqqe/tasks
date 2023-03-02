import { type FirebaseApp } from "firebase/app";
import { type Auth, getAuth } from "firebase/auth";
import {
  collection,
  type CollectionReference,
  deleteDoc,
  doc,
  type Firestore,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { type IProjectRepository } from "../../application/project-repository.js";
import { type IProject } from "../../domain/project.js";

export class FirestoreProjectRepository implements IProjectRepository {
  private readonly auth: Auth;
  private readonly firestore: Firestore;

  constructor(app: FirebaseApp) {
    this.auth = getAuth(app);
    this.firestore = getFirestore(app);
  }

  public async create(project: IProject): Promise<void> {
    await setDoc(doc(this.collection(), project.id), project);
  }

  public async delete(projectId: string): Promise<void> {
    await deleteDoc(doc(this.collection(), projectId));
  }

  public async list(): Promise<IProject[]> {
    return (
      await getDocs(query(this.collection(), where("archived", "==", false)))
    ).docs.map((snapshot) => snapshot.data());
  }

  public async listArchived(): Promise<IProject[]> {
    return (
      await getDocs(query(this.collection(), where("archived", "==", true)))
    ).docs.map((snapshot) => snapshot.data());
  }

  public async update(project: IProject): Promise<void> {
    await updateDoc(doc(this.collection(), project.id), project);
  }

  private collection(): CollectionReference<IProject> {
    const user = this.auth.currentUser;

    if (!user) {
      throw new Error("user not authenticated");
    }

    return collection(
      this.firestore,
      `version/1/users/${user.uid}/projects`
    ) as CollectionReference<IProject>;
  }
}
