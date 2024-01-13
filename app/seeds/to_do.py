from app.models import db, To_do, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date

new_date = date.today()

# Adds a demo user, you can add other users here if you want
def seed_to_dos():
    demo = To_do(
        user_id = 1, title = 'Prep D&D', notes = 'Encounter: Beholder.', difficulty = 1, tags = '["sleep","wake","morning"]', due_date = new_date , checklist = '["HP", "AC", "Moves"]', completed = False)
    marnie = To_do(
        user_id = 1, title = 'Email Players', notes = 'Tell them to bring snacks.', difficulty = 2, tags = '["lift","get_good","just_do_it"]', due_date = new_date, checklist = '["snickers", "Chips", "Soda"]', completed = False)
    bobbie = To_do(
        user_id = 1, title = 'Run Session', notes = 'TPK?', difficulty = 3, tags = '["sleep","night"]', due_date = new_date, checklist = '["Bring new character sheets"]', completed = False)

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
def undo_to_dos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.to_dos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM to_dos"))

    db.session.commit()

#update