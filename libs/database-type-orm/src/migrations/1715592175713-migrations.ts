import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1715592175713 implements MigrationInterface {
  name = 'Migrations1715592175713';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`post_image\` ADD \`status\` int UNSIGNED NOT NULL COMMENT '1: active, 0: not active' DEFAULT '1'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`post_image\` DROP COLUMN \`status\``,
    );
  }
}
