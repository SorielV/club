CREATE TABLE "User"(
  "id" serial,
  "username" varchar(20) unique not null,
  "email" varchar(80) unique not null,
  "password" varchar(120) not null
  "createdAt" datetime default current_timestamp,
  "updatedAt" datetime null
);

CREATE TABLE "UserInfo"(
  "id" serial,
  "idUser" integer references "Users"(id),
  "firstName" varchar(80) not null,
  "lastName" varchar(80) not null,
  "profileImage" varchar(120) null,
  "about" varchar(255) null,
  "school" varchar(120) null,
  /**
   Ocupaciones etc
  **/
  "createdAt" datetime default current_timestamp,
  "updatedAt" datetime null
);

CREATE TABLE "Club"(
  "id" serial,
  "idUser" integer references "Users"(id),
  "identifier" varchar(20) unique not null,
);

CREATE TABLE "ClubMember"(
  "id" serial,
  "idClub" integer references "Club"(id),
  "idUser" integer references "Users"(id),
  "role" smallint default 1 check("role" > 0)
);

CREATE TABLE "Blog"(
  "id" serial,
  "idClub" integer references "Club"(id) null,
  "idUser" integer references "Users"(id),
  "identifier" varchar(20) unique,
  "about" varchar(255),
  "createdAt" datetime default current_timestamp,
  "updatedAt" datetime null
);

CREATE TABLE "BlogInfo"(
  "id" serial,
  "idClub" integer references "Club"(id) null,
  "idUser" integer references "Users"(id),
  "content" text null,
  "createdAt" datetime default current_timestamp,
  "updatedAt" datetime null
);
