import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1715841167261 implements MigrationInterface {
  name = 'Migrations1715841167261';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`request_make_friend\` DROP COLUMN \`status\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`request_make_friend\` ADD \`status\` int NOT NULL COMMENT '1: accepted, 0: havent ever accepted, 2: deleted req' DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`request_make_friend\` DROP COLUMN \`status\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`request_make_friend\` ADD \`status\` tinyint NOT NULL COMMENT 'true: accepted, false: havent ever accepted' DEFAULT '0'`,
    );
  }
}
