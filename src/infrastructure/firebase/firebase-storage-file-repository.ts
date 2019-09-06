import "firebase/storage";
import * as firebase from "firebase/app";
import UUID from "pure-uuid";
import { IFileRepository } from "../../application/file-repository";

export class FirebaseStorageFileRepository implements IFileRepository {
  public async create(file: Blob): Promise<string> {
    const child = this.files().child(new UUID(4).format());

    await child.put(file);
    await child.updateMetadata({
      cacheControl: `max-age=${60 * 60 * 24 * 365}`
    });

    return child.getDownloadURL();
  }

  private files(): firebase.storage.Reference {
    const user = firebase.auth().currentUser;

    if (!user) {
      throw new Error("user not authenticated");
    }

    return firebase
      .storage()
      .ref()
      .child("users")
      .child(user.uid)
      .child("files");
  }
}
