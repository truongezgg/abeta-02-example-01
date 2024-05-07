import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1715052856635 implements MigrationInterface {
    name = 'Migrations1715052856635'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`post_image\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`post_id\` bigint UNSIGNED NOT NULL, \`url\` varchar(255) NOT NULL, \`deleted_at\` datetime(6) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`post_image\` ADD CONSTRAINT \`FK_c75a6b8c090482abc8597fd7dfc\` FOREIGN KEY (\`post_id\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post_image\` DROP FOREIGN KEY \`FK_c75a6b8c090482abc8597fd7dfc\``);
        await queryRunner.query(`DROP TABLE \`post_image\``);
    }

}
