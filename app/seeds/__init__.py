from flask.cli import AppGroup
from .users import seed_users, undo_users
from .avatar import seed_avatars, undo_avatars
from .background import seed_backgrounds, undo_backgrounds
from .body import seed_bodies, undo_bodies
from .face import seed_faces, undo_faces
from .hair import seed_hair, undo_hair
from .daily import seed_dailies, undo_dailies
from .habit import seed_habits, undo_habits
from .to_do import seed_to_dos, undo_to_dos

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        undo_users()
        # Before seeding in production, you want to run the seed undo 
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        # command, which will  truncate all tables prefixed with 
        db.session.commit()
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
    seed_users()
    seed_avatars()
    seed_backgrounds()
    seed_hair()
    seed_bodies()
    seed_faces()
    seed_dailies()
    seed_habits()
    seed_to_dos()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_avatars()
    undo_backgrounds()
    undo_hair()
    undo_bodies()
    undo_faces()
    undo_dailies()
    undo_habits()
    undo_to_dos()
    # Add other undo functions here
