"""empty message

Revision ID: 76bce46bc464
Revises: 
Create Date: 2024-01-13 10:32:17.659102

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '76bce46bc464'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('backgrounds',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('url', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('bodies',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('url', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('faces',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('url', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('hairs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('url', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('first_name', sa.String(length=255), nullable=False),
    sa.Column('last_name', sa.String(length=255), nullable=False),
    sa.Column('exp', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('avatars',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('background_id', sa.Integer(), nullable=False),
    sa.Column('hair_id', sa.Integer(), nullable=True),
    sa.Column('face_id', sa.Integer(), nullable=True),
    sa.Column('body_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['background_id'], ['backgrounds.id'], ),
    sa.ForeignKeyConstraint(['body_id'], ['bodies.id'], ),
    sa.ForeignKeyConstraint(['face_id'], ['faces.id'], ),
    sa.ForeignKeyConstraint(['hair_id'], ['hairs.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('dailies',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=255), nullable=False),
    sa.Column('notes', sa.String(length=255), nullable=True),
    sa.Column('difficulty', sa.Integer(), nullable=False),
    sa.Column('duration', sa.Integer(), nullable=False),
    sa.Column('tags', sa.String(length=255), nullable=False),
    sa.Column('start_date', sa.Date(), nullable=False),
    sa.Column('days', sa.String(length=255), nullable=False),
    sa.Column('checklist', sa.String(length=255), nullable=False),
    sa.Column('streak', sa.Integer(), nullable=False),
    sa.Column('completed', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('habits',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=255), nullable=False),
    sa.Column('notes', sa.String(length=255), nullable=True),
    sa.Column('difficulty', sa.Integer(), nullable=False),
    sa.Column('duration', sa.Integer(), nullable=False),
    sa.Column('tags', sa.String(length=255), nullable=False),
    sa.Column('positive', sa.Boolean(), nullable=False),
    sa.Column('streak', sa.Integer(), nullable=False),
    sa.Column('completed', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('to_dos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=255), nullable=False),
    sa.Column('notes', sa.String(length=255), nullable=True),
    sa.Column('difficulty', sa.Integer(), nullable=False),
    sa.Column('tags', sa.String(length=255), nullable=False),
    sa.Column('due_date', sa.Date(), nullable=False),
    sa.Column('checklist', sa.String(length=255), nullable=False),
    sa.Column('completed', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('to_dos')
    op.drop_table('habits')
    op.drop_table('dailies')
    op.drop_table('avatars')
    op.drop_table('users')
    op.drop_table('hairs')
    op.drop_table('faces')
    op.drop_table('bodies')
    op.drop_table('backgrounds')
    # ### end Alembic commands ###