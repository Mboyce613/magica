from app.models import db, Daily, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date

new_date = date.today()

# Adds a demo user, you can add other users here if you want
def seed_dailies():
    demo = Daily(
        user_id = 1, title = 'Read a Book', notes = 'Must get smart.', difficulty = 1, duration = 1, tags = '["book","read","improvement"]', start_date = new_date , days = '["Mon","Tue"]', checklist = '["pick a book", "open book", "read a chapter"]', streak = 1, completed = False)
    marnie = Daily(
        user_id = 1, title = 'Cast a Spell', notes = 'A really good one.', difficulty = 2, duration = 2, tags = '["magic","spell","cast"]', start_date = new_date ,days = '["Wed","Thu"]', checklist = '["gather mana", "focus", "burnanate"]', streak = 1, completed = False)
    bobbie = Daily(
        user_id = 1, title = 'Talk to a Girl', notes = 'I can do it, its not hard.', difficulty = 3, duration = 3, tags = '["hopeless","why_do_i_bother","its_not_worth_it"]', start_date = new_date ,days = '["Fri"]', checklist = '["write a line", "practice in mirror", "say line to girl"]', streak = 1, completed = False)

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
def undo_dailies():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.dailies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM dailies"))

    db.session.commit()

#update