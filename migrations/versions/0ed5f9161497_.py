"""empty message

Revision ID: 0ed5f9161497
Revises: 76bce46bc464
Create Date: 2024-01-25 18:24:41.384615

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0ed5f9161497'
down_revision = '76bce46bc464'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('dailies', schema=None) as batch_op:
        batch_op.alter_column('tags',
               existing_type=sa.VARCHAR(length=255),
               nullable=True)
        batch_op.alter_column('checklist',
               existing_type=sa.VARCHAR(length=255),
               nullable=True)

    with op.batch_alter_table('to_dos', schema=None) as batch_op:
        batch_op.alter_column('tags',
               existing_type=sa.VARCHAR(length=255),
               nullable=True)
        batch_op.alter_column('due_date',
               existing_type=sa.DATE(),
               nullable=True)
        batch_op.alter_column('checklist',
               existing_type=sa.VARCHAR(length=255),
               nullable=True)
        batch_op.alter_column('completed',
               existing_type=sa.BOOLEAN(),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('to_dos', schema=None) as batch_op:
        batch_op.alter_column('completed',
               existing_type=sa.BOOLEAN(),
               nullable=False)
        batch_op.alter_column('checklist',
               existing_type=sa.VARCHAR(length=255),
               nullable=False)
        batch_op.alter_column('due_date',
               existing_type=sa.DATE(),
               nullable=False)
        batch_op.alter_column('tags',
               existing_type=sa.VARCHAR(length=255),
               nullable=False)

    with op.batch_alter_table('dailies', schema=None) as batch_op:
        batch_op.alter_column('checklist',
               existing_type=sa.VARCHAR(length=255),
               nullable=False)
        batch_op.alter_column('tags',
               existing_type=sa.VARCHAR(length=255),
               nullable=False)

    # ### end Alembic commands ###
