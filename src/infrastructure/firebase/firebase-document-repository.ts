import "firebase/firestore";
import * as firebase from "firebase/app";
import { last } from "lodash";
import { IDocument } from "../../domain/document";
import { IDocumentRepository } from "../../application/document-repository";

export class FirebaseDocumentRepository implements IDocumentRepository {
  public async create(document: IDocument): Promise<void> {
    await this.collection()
      .doc(document.id)
      .set({
        ...document,
        createdAt: Math.floor(Date.now() / 1000) // Unix timestamp
      });
  }

  public async delete(documentID: string): Promise<void> {
    await this.collection()
      .doc(documentID)
      .delete();
  }

  public async *list(limit: number): AsyncIterator<IDocument[], void> {
    let result = await this.query()
      .limit(limit)
      .get();

    while (result.docs.length > 0) {
      yield result.docs.map(snapshot => snapshot.data() as IDocument);

      result = await this.query()
        .startAfter(last(result.docs))
        .limit(limit)
        .get();
    }
  }

  public async update(document: IDocument): Promise<void> {
    await this.collection()
      .doc(document.id)
      .update(document);
  }

  private query(): firebase.firestore.Query {
    return this.collection().orderBy("createdAt", "desc");
  }

  private collection(): firebase.firestore.CollectionReference {
    const user = firebase.auth().currentUser;

    if (!user) {
      throw new Error("user not authenticated");
    }

    return firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .collection("documents");
  }
}
