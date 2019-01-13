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
);

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

CREATE TABLE "Blog"(
  "id" serial unique primary key,
  "idClub" integer references "Club"(id),
  "idUser" integer references "User"(id),
  "title" varchar(20) not null,
  "slug" varchar(20),
  "description" varchar(255) null,
  "content" text not null,
  "visibility" smallint default 1,
  "createdAt" date default current_timestamp,
  "updatedAt" date null
);

CREATE VIEW "VBlog" as (
  select
    "Blog"."id",
    "Blog"."idClub",
    "Blog"."idUser",
    "Blog"."title",
    "Blog"."slug",
    "Blog"."content",
    "Blog"."visibility",
    "UserProfile"."username",
    "UserProfile"."profileImage",
    "UserProfile"."firstName",
    "Blog"."createdAt",
    "Blog"."updatedAt"
  from "Blog" inner join "UserProfile" using ("idUser")
);

CREATE VIEW "VBlogInfo" as (
  select
    "Blog"."id",
    "Blog"."idClub",
    "Blog"."idUser",
    "Blog"."title",
    "Blog"."slug",
    "Blog"."description",
    "Blog"."visibility",
    "UserProfile"."username",
    "UserProfile"."profileImage",
    "UserProfile"."firstName",
    "Blog"."createdAt",
    "Blog"."updatedAt"
  from "Blog" inner join "UserProfile" using ("idUser")
);

CREATE TABLE "Tag"(
  "id" serial unique primary key,
  "tag" varchar(20) not null,
  "slug" varchar(20) not null unique
);

CREATE TABLE "BlogTag"(
  "id" serial unique primary key,
  "idBlog" integer references "Blog"(id),
  "idTag" integer references "Tag"(id)
);

CREATE VIEW "VBlogTag" as (
  select "BlogTag"."idBlog", "Tag"."id", "Tag".tag, "Tag".slug from "BlogTag" inner join "Tag" on "BlogTag"."idTag" = "Tag".id
);

CREATE TABLE "Topic"(
  "id" serial unique primary key,
  "topic" varchar(20) not null,
  "slug" varchar(20) not null unique
);

CREATE VIEW "VBlogTopic" as (
  select "BlogTopic"."idBlog", "Topic"."id", "Topic".topic, "Topic".slug from "BlogTopic" inner join "Topic" on "BlogTopic"."idTopic" = "Topic".id
);

CREATE TABLE "BlogTopic"(
  "id" serial unique primary key,
  "idBlog" integer references "Blog"(id),
  "idTopic" integer references "Topic"(id)
);

select * from "VBlog";

select * from "Blog"
  left join "VBlogTopic" on "VBlogTopic"."idBlog" = "Blog".id
  left join "VBlogTag" on "VBlogTag"."idBlog" = "Blog".id;

-- Topic
select * from "Blog"
  left join "VBlogTopic" on "VBlogTopic"."idBlog" = "Blog".id
  left join "VBlogTag" on "VBlogTag"."idBlog" = "Blog".id
  where "Blog".id in (
    select "BlogTopic"."idBlog" as "id" from "BlogTopic"
    where "BlogTopic"."idTopic" = 1
    group by "BlogTopic"."idBlog"
  )
;

-- Tag
select * from "Blog"
  left join "VBlogTopic" on "VBlogTopic"."idBlog" = "Blog".id
  left join "VBlogTag" on "VBlogTag"."idBlog" = "Blog".id
  where "Blog".id in (
    select "BlogTag"."idBlog" as "id" from "BlogTag"
    where "BlogTag"."idTag" in (2)
    group by "BlogTag"."idBlog"
  )
;

EXPLAIN ANALYSE select
    "Blog"."id","Blog"."idClub","Blog"."idUser","Blog"."title","Blog"."slug","Blog"."description","Blog"."visibility","Blog"."createdAt","Blog"."updatedAt","VBlogTag"."id" as "tag.id","VBlogTag"."tag" as "tag.tag","VBlogTag"."slug" as "tag.slug","VBlogTopic"."id" as "tag.id","VBlogTopic"."topic" as "tag.topic","VBlogTopic"."slug" as "tag.slug"
    from "Blog"
      left join "VBlogTopic" on "VBlogTopic"."idBlog" = "Blog".id
      left join "VBlogTag" on "VBlogTag"."idBlog" = "Blog".id
   where
    "Blog"."id" in (
      select "BlogTag"."idBlog" as "id" from "BlogTag"
        where "BlogTag"."idTag" in (1)
      group by "BlogTag"."idBlog"
    )
   and "Blog"."idClub" = 1 and "Blog"."idUser" = 1 limit 12 offset 0;


EXPLAIN ANALYSE select
    "Blog"."id","Blog"."idClub","Blog"."idUser","Blog"."title","Blog"."slug","Blog"."description","Blog"."visibility","Blog"."createdAt","Blog"."updatedAt","VBlogTag"."id" as "tag.id","VBlogTag"."tag" as "tag.tag","VBlogTag"."slug" as "tag.slug","VBlogTopic"."id" as "tag.id","VBlogTopic"."topic" as "tag.topic","VBlogTopic"."slug" as "tag.slug"
    from "Blog"
      left join "VBlogTopic" on "VBlogTopic"."idBlog" = "Blog".id
      left join "VBlogTag" on "VBlogTag"."idBlog" = "Blog".id
   where "Blog"."idClub" = 1 and
    "Blog"."id" in (
      select "BlogTag"."idBlog" as "id" from "BlogTag"
        where "BlogTag"."idTag" in (1)
      group by "BlogTag"."idBlog"
    )
   limit 12 offset 0;


CREATE TABLE "Calendar"(
  "id" serial unique not null primary key,
  "idClub" integer references "Club"(id),
  "createdAt" date default current_timestamp
);

drop table "Event";

CREATE TABLE "Event"(
  "id" serial unique not null primary key,
  "calendarId" integer references "Club"(id),
  "idUser" integer unique references "User"(id),
  "title" varchar(20) not null,
  "body" varchar(150) null,
  "category" varchar(10) null,
  "location" varchar(100) null,
  "start" timestamp not null,
  "end" timestamp not null check ("end" >= "start"),
  "color" varchar(7) null,
  "bgColor" varchar(7) null,
  "visibility" smallint default 1,
  "createdAt" date default current_timestamp,
  "updatedAt" date null
)

