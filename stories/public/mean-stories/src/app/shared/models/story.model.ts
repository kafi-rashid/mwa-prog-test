export class Story {
  "_id": string;
  "title": string;
  "container": Container;
  "topic": Topic;
  "media": string;
  "comments": string;
  "description": string;
  "status": string;
  "user": User;
}

export class Container {
  "_id": string;
  "name": string;
  "short_name": string;
}

export class Topic {
  "_id": string;
  "name": string;
  "short_name": string;
}

export class User {
  "_id": string;
  "name": string;
  "registered": number;
  "icon": string;
  "profileviews": number;
}