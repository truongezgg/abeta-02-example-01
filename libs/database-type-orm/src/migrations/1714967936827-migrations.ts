import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1714967936827 implements MigrationInterface {
    name = 'Migrations1714967936827'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(100) NULL, \`name\` varchar(100) NULL, \`status\` tinyint UNSIGNED NOT NULL DEFAULT '1', \`is_super_admin\` tinyint NOT NULL DEFAULT '0', \`none_token\` varchar(100) NULL, \`refresh_token\` varchar(500) NULL, \`invited_by\` bigint UNSIGNED NULL, \`deleted_at\` datetime(6) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
