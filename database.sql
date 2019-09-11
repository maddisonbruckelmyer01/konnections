
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "birthday" VARCHAR(100) NOT NULL,
    "gender" VARCHAR(100) NOT NULL,
    "generated_username" VARCHAR(100) NOT NULL,
    "admin" BOOLEAN NOT NULL
);
CREATE TABLE "counselors" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(2000),
	"website" VARCHAR(2000),
	"phone_number" VARCHAR(2000),
	"description" VARCHAR(5000)
);
CREATE TABLE "messages" (
	"id" SERIAL PRIMARY KEY,
	"message" VARCHAR(2000),
	"user_id" INT REFERENCES "user",
	"board_id" INT REFERENCES "board",
	"date_posted" VARCHAR(2000)
);
CREATE TABLE "board" (
	"id" SERIAL PRIMARY KEY,
	"board_name" VARCHAR(2000),
	"description" VARCHAR(2000),
	"isShown" BOOLEAN
);

CREATE TABLE "direct_messages" (
	"id" SERIAL PRIMARY KEY,
	"sender_id" INT REFERENCES "user",
	"receiver_id" INT REFERENCES "user",
	"message" VARCHAR(5000),
	"date_posted" VARCHAR(200)
);
INSERT INTO "counselors" ("name", "website", "phone_number", "description") 
VALUES ('National Suicide Prevention Lifeline', 'https://suicidepreventionlifeline.org', 
    '1-800-273-8255', 'They help prevent suicide. They provide 24/7, free and confidential support.'), 
('Substance Abuse and Mental Health National Helpline', 'https://www.samhsa.gov/find-help/national-helpline', 
    '1-800-662-4357', 'They are a confidential, free and 24/7 information service for families or individuals who are 
    facing mental and/or substance use disorders.'), 
    ('Lifeline Chrisis Chat', 'https://www.contact-usa.org/chat.html', 'No Phone Number', 
    'A service of the National Suicide Prevention Lifeline. The specialists can provide emotional online support, 
    crisis intervention and suicide prevention services.'), 
    ('Turn2Me', 
    'https://turn2me.org/landing/online-counselling-a?gclid=Cj0KEQiA_eXEBRDP8fnIlJDXxsIBEiQAAGfyobte-ezexZaujEgFNblI17l143wrO
    87YxwngPYLrD9EaArFj8P8HAQ', 'No Phone Number', 'Free online counseling, just create an account.'), 
    ('CIMHS', 'https://cimhs.com', 'No Phone Number', 'Main focus is on depression. Bliss is an interactive 
    therapy program for depression, you get 8 free sessions when you sign up.'), 
    ('7Cups', 'https://www.7cups.com', 'No Phone Number', 'Free 24/7 online counseling. The listeners are 
    volunteers who will understand what you are going through.'), 
    ('Kooth', 'https://www.kooth.com', 'No Phone Number', 'A free, safe and anonymous online support for 
    young people. They are not a 24/7 service but on their website they say if they are online or offline');