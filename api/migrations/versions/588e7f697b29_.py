"""empty message

Revision ID: 588e7f697b29
Revises: fd254228a133
Create Date: 2023-03-03 10:55:39.849065

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '588e7f697b29'
down_revision = 'fd254228a133'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('wg_events', sa.Column('currencies', postgresql.ARRAY(sa.String(length=10)), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('wg_events', 'currencies')
    # ### end Alembic commands ###
