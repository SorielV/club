EXPLAIN ANALYZE SELECT
    "UserInfo"."idUser",
    "User".username,
    "UserInfo"."firstName",
    "UserInfo"."profileImage"
  from "User"
    inner join "UserInfo"
      on "User".id = "UserInfo"."idUser"
  where "User".username = 1;

EXPLAIN ANALYZE select * from "UserProfile" where "UserProfile"."idUser" = 1;