"""empty message

Revision ID: 735ec84ab264
Revises: 4f74bca17782
Create Date: 2023-03-13 11:11:32.541605

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '735ec84ab264'
down_revision = '4f74bca17782'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('wg_volunteers', sa.Column('numOfPics', sa.Integer(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('wg_volunteers', 'numOfPics')
    # ### end Alembic commands ###
