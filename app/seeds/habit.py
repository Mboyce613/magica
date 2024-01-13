from app.models import db, Habit, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date

new_date = date.today()

# Adds a demo user, you can add other users here if you want
def seed_habits():
    demo = Habit(
        user_id = 1, title = 'Wake up on time', notes = '7am.', difficulty = 1, duration = 1, tags = '["sleep","wake","morning"]', positive = 1 , streak = 0, completed = False)
    marnie = Habit(
        user_id = 1, title = 'Go to gym', notes = 'And dont skip leg day.', difficulty = 2, duration = 2, tags = '["lift","get_good","just_do_it"]', positive = 1, streak = 0, completed = False)
    bobbie = Habit(
        user_id = 1, title = 'Stay up too late', notes = 'Bed by 11pm.', difficulty = 3, duration = 3, tags = '["sleep","night"]', positive = 0, streak = 0, completed = False)

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_habits():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.habits RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM habits"))

    db.session.commit()

#update