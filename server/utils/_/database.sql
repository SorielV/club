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

select * from "User" inner join "UserInfo" on "User".id = "UserInfo"."idUser";

-- Listado de clubes
CREATE TABLE "Club"(
  "id" serial,
  "idUser" integer references "Users"(id),
  "identifier" varchar(20) unique not null,
  "description" varchar(255) null,
  "visibility" smallint,
  "createdAt" datetime default current_timestamp,
  "updatedAt" datetime null
);

-- Vista propia de club
CREATE TABLE "ClubInfo"(
  "id" serial,
  "idClub" integer references "Club"(id),
  "idUser" integer references "Users"(id),
)

-- Normal
select * from "Club" inner join "ClubInfo" on "Club".id = "ClubInfo"."idClub";

CREATE TABLE "ClubMember"(
  "id" serial,
  "idClub" integer references "Club"(id),
  "idUser" integer references "Users"(id),
  "role" smallint default 1 check("role" > 0)
);

-- Full
select * from "Blog"
  inner join "BlogInfo" on "Blog".id = "BlogInfo"."idBlog";
  inner join "BlogTag" on "Blog".id = "BlogTag"."idBlog"
    inner join "Tag" on "BlogTag"."idTag" = "Tag".id
  inner join "BlogTag" on "Blog".id = "BlogTag"."idBlog"

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

CREATE TABLE "Tag"(
  "id" serial,
  "tag" varchar(20) not null,
  "slug" varchar(20) not null unique,
)

CREATE TABLE "BlogTag"(
  "id" serial,
  "idBlog" integer references "Blog"(id) null,
  "idTag" integer references "Tag"(id) null,
);

CREATE TABLE "Topic"(
  "id" serial,
  "topic" varchar(20) not null,
  "slug" varchar(20) not null unique,
)

CREATE TABLE "BlogTopic"(
  "id" serial,
  "idBlog" integer references "Blog"(id) null,
  "idTopic" integer references "Topic"(id) null,
);