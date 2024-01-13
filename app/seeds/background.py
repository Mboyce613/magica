from app.models import db, Background, environment, SCHEMA
from sqlalchemy.sql import text



# Adds a demo user, you can add other users here if you want
def seed_backgrounds():
    red = Background(
        url = "../graphics/Background_Red")
    blue = Background(
        url = "../graphics/Background_Blue")
    green = Background(
        url = "../graphics/Background_Green")

    db.session.add(red)
    db.session.add(blue)
    db.session.add(green)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_backgrounds():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.backgrounds RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM backgrounds"))

    db.session.commit()

#update