CREATE TABLE "User"(
  "id" serial unique primary key,
  "username" varchar(20) unique not null,
  "email" varchar(80) unique not null,
  "password" varchar(120) not null,
  "createdAt" date default current_timestamp,
  "updatedAt" date null
);

CREATE TABLE "UserInfo"(
  "id" serial unique primary key,
  "idUser" integer unique references "User"(id),
  "firstName" varchar(80) not null,
  "lastName" varchar(80) not null,
  "profileImage" varchar(120) null,
  "about" varchar(255) null,
  "school" varchar(120) null,
  /**
   Ocupaciones etc
  **/
  "createdAt" date default current_timestamp,
  "updatedAt" date null
);

CREATE VIEW "UserProfile" AS (
  SELECT
    "User"."id" as "idUser",
    "User".username,
    "UserInfo"."firstName",
    "UserInfo"."profileImage"
  from "User"
    inner join "UserInfo"
      on "User".id = "UserInfo"."idUser"
);

CREATE VIEW "UserProfileInfo" AS (
  SELECT
    "User"."id" as "idUser",
    "User".username,
    "UserInfo"."profileImage",
    "UserInfo"."firstName",
    "UserInfo"."lastName",
    "UserInfo"."about",
    "UserInfo"."school"
  from "User"
    inner join "UserInfo"
      on "User".id = "UserInfo"."idUser"
);

CREATE TABLE "Tag"(
  "id" serial unique primary key,
  "tag" varchar(20) not null,
  "slug" varchar(20) not null unique
);

CREATE TABLE "Topic"(
  "id" serial unique primary key,
  "topic" varchar(20) not null,
  "slug" varchar(20) not null unique
);

CREATE TABLE "Club"(
  "id" serial unique primary key,
  "idUser" integer references "User"(id),
  "identifier" varchar(20) unique not null,
  "slug" varchar(20) unique not null,
  "description" varchar(255) null,
  "visibility" smallint default 1,
  "createdAt" date default current_timestamp,
  "updatedAt" date null
);

CREATE TABLE "ClubInfo"(
  "id" serial unique primary key,
  "idClub" integer references "Club"(id),
  "content" text,
  -- etc ...
  "createdAt" date default current_timestamp,
  "updatedAt" date null
);

CREATE TABLE "ClubMember"(
  "id" serial unique primary key,
  "idClub" integer references "Club"(id),
  "idUser" integer references "User"(id),
  "rol" smallint default 0,
  "createdAt" date default current_timestamp,
  "updatedAt" date null
)

-- Info (busquedas, muestra general, etc)
CREATE VIEW "VClub" as (
  select "Club".id, "Club".identifier, "Club".description, "UserProfile".*, "Club"."createdAt" from "Club"
    inner join "UserProfile" on "Club"."idUser" = "UserProfile"."idUser"
);

-- Vista concrate de un Club
CREATE VIEW "VClubInfo" as (
  select "Club".id, "Club".identifier, "ClubInfo".content, "UserProfile".*, "Club"."createdAt" from "Club"
    inner join "ClubInfo" on "Club".id = "ClubInfo"."idClub"
    inner join "UserProfile" on "Club"."idUser" = "UserProfile"."idUser"
);

select * from "VClubInfo";
select * from "VClub";