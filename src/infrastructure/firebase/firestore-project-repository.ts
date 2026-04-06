import type { FirebaseApp } from "firebase/app";
import { type Auth, getAuth } from "firebase/auth";
import {
  type CollectionReference,
  collection,
  deleteDoc,
  doc,
  type Firestore,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore/lite";
import type { ProjectRepository } from "../../application/project-repository.js";
import type { Project } from "../../domain/project.js";

export class FirestoreProjectRepository implements ProjectRepository {
  readonly #auth: Auth;
  readonly #firestore: Firestore;

  constructor(app: FirebaseApp) {
    this.#auth = getAuth(app);
    this.#firestore = getFirestore(app);
  }

  async create(project: Project): Promise<void> {
    await setDoc(doc(this.#collection(), project.id), project);
  }

  async delete(projectId: string): Promise<void> {
    await deleteDoc(doc(this.#collection(), projectId));
  }

  async list(): Promise<Project[]> {
    return (
      await getDocs(query(this.#collection(), where("archived", "==", false)))
    ).docs.map((snapshot) => snapshot.data());
  }

  async listArchived(): Promise<Project[]> {
    return (
      await getDocs(query(this.#collection(), where("archived", "==", true)))
    ).docs.map((snapshot) => snapshot.data());
  }

  async update(project: Project): Promise<void> {
    await updateDoc(doc(this.#collection(), project.id), { ...project });
  }

  #collection(): CollectionReference<Project> {
    const user = this.#auth.currentUser;

    if (!user) {
      throw new Error("user not authenticated");
    }

    return collection(
      this.#firestore,
      `version/1/users/${user.uid}/projects`,
    ) as CollectionReference<Project>;
  }
}
