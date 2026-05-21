import { CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

export abstract class BaseModel {
  // El campo 'id' ha sido removido de aquí para que lo declare cada entidad

  @Column({ name: 'Audit_CreatedBy', type: 'varchar', default: '' })
  createdBy!: string;

  @CreateDateColumn({ name: 'Audit_CreatedAt', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ name: 'Audit_ModifiedBy', type: 'varchar', nullable: true })
  modifiedBy!: string | null;

  @UpdateDateColumn({ name: 'Audit_ModifiedAt', type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  modifiedAt!: Date | null;

  @Column({ name: 'Audit_IsActive', type: 'boolean', default: true })
  isActive!: boolean;

  @Column({ name: 'Audit_IsEnabled', type: 'boolean', default: true })
  isEnabled!: boolean;
}