import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1715206666551 implements MigrationInterface {
  name = 'Migrations1715206666551';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`request_make_friend\` CHANGE \`status\` \`status\` tinyint NOT NULL COMMENT 'true: accepted, false: havent ever accepted' DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`request_make_friend\` CHANGE \`status\` \`status\` tinyint NOT NULL COMMENT 'true: accepted, false: havent ever accepted' DEFAULT '1'`,
    );
  }
}
