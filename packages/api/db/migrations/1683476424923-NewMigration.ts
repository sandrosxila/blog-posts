import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigration1683476424923 implements MigrationInterface {
  name = 'NewMigration1683476424923';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("userId" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "photo" varchar NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "post" ("postId" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "image" varchar, "content" varchar, "userUserId" integer)`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_post" ("postId" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "image" varchar, "content" varchar, "userUserId" integer, CONSTRAINT "FK_383f47c98d6fc3e18786e00ed41" FOREIGN KEY ("userUserId") REFERENCES "user" ("userId") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_post"("postId", "title", "image", "content", "userUserId") SELECT "postId", "title", "image", "content", "userUserId" FROM "post"`,
    );
    await queryRunner.query(`DROP TABLE "post"`);
    await queryRunner.query(`ALTER TABLE "temporary_post" RENAME TO "post"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" RENAME TO "temporary_post"`);
    await queryRunner.query(
      `CREATE TABLE "post" ("postId" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "image" varchar, "content" varchar, "userUserId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "post"("postId", "title", "image", "content", "userUserId") SELECT "postId", "title", "image", "content", "userUserId" FROM "temporary_post"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_post"`);
    await queryRunner.query(`DROP TABLE "post"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
