---user table

create table "sk_user"(
"id" varchar2(36) not null,
"userName" varchar2(250) not null,
"email" varchar2(36) not null,
"phone" number(10) not null,
"password" varchar2(36) not null,
"role" VARCHAR2(100 BYTE)not null,
"dob" varchar2(36) not null,
"country" varchar2(250) not null,
"state" varchar2(250) not null,
"gender" varchar2(36) not null,
"isRegistered" number(1,0) default 0,
"uuid" varchar2(36) not null,
"isInvited" number(1,0) default 0,
"inviteOn" date,
"inviteLink" varchar2(100),
"createdAt" TIMESTAMP(8),
"createdBy" varchar2(36),
"updatedAt" TIMESTAMP(8),
"updatedBy" varchar2(36),
primary key("id")
);

---count table

create table "sk_count" (
"id" varchar2(36) not null,
"page" number not null,
"noOfCount" number not null,
"uuid" varchar2(36) not null,
"createdAt" TIMESTAMP(8),
"createdBy" varchar2(36),
"updatedAt" TIMESTAMP(8),
"updatedBy" varchar2(36),
primary key("id")
);


---country table

create table "sk_country" (
"id" varchar2(36) not null,
"countryName" varchar2(250) not null,
"createdAt" TIMESTAMP(8),
"createdBy" varchar2(36),
"updatedAt" TIMESTAMP(8),
"updatedBy" varchar2(36),
primary key("id")
);

---state table

create table "sk_state" (
"id" varchar2(36) not null,
"stateName" varchar2(250) not null,
"countryId" varchar2(36) not null,
"createdAt" TIMESTAMP(8),
"createdBy" varchar2(36),
"updatedAt" TIMESTAMP(8),
"updatedBy" varchar2(36),
primary key("id"),
foreign key("countryId") references "sk_country" ("id")ON DELETE CASCADE
);
