import { Injectable } from '@angular/core';
import { AnonymousCredential, RemoteMongoClient, Stitch, StitchAppClient } from 'mongodb-stitch-browser-sdk';
import { environment } from '../../environments/environment';
import { from, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  // Client variable to use in multiple services.
  protected readonly client: StitchAppClient = Stitch.initializeDefaultAppClient(environment.stitchClientName);
  // MongoDB variable used for accessing collections from a database.
  protected readonly mongodb: RemoteMongoClient = this.client.getServiceClient(RemoteMongoClient.factory, environment.stitchServiceName);

  constructor() {
    // By default log the user in anonymously.
    Stitch.defaultAppClient.auth.loginWithCredential(new AnonymousCredential()).catch(console.error);
  }

  /**
   * Make the client variable shareable.
   * @returns {StitchAppClient}
   */
  get getClient(): StitchAppClient {
    return this.client;
  }

  /**
   * Make the mongodb variable shareable.
   * @returns {RemoteMongoClient}
   */
  get getMongoDB(): RemoteMongoClient {
    return this.mongodb;
  }

  /**
   * Subscribes the user to our email.
   * @param {string} email 
   * @param {string} name 
   * @returns {Observable<{statusCode: number}>}
   */
  subscribe(email: string, name: string): Observable<{statusCode: number}> {
    return from(this.client.callFunction('subscribe_signup', [email, name]));
  }
  
}