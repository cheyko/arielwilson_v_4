"""empty message

Revision ID: 747905966c54
Revises: 735ec84ab264
Create Date: 2023-03-13 11:40:01.722655

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '747905966c54'
down_revision = '735ec84ab264'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('wg_volunteers', sa.Column('metrics', sa.String(length=10), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('wg_volunteers', 'metrics')
    # ### end Alembic commands ###
