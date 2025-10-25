'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'books',
      [
        {
          uuid: '123e4567-e89b-12d3-a456-426614174000',
          title: 'Angels and Demons',
          author: 'Dan Brown',
          isbn: '978-1416524793',
          description:
            'When a groundbreaking physicist is found murdered with a mysterious symbol seared onto his chest, Harvard symbologist Robert Langdon is called to investigate. Following a trail of clues through Rome, Langdon becomes entangled in a centuries-old conflict between science and religion.',
          genre: 'Thriller',
          price: 9.99,
          stock: 50,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          uuid: '123e4567-e89b-12d3-a456-426614174001',
          title: 'The Lost Symbol',
          author: 'Dan Brown',
          isbn: '978-0385504225',
          description:
            "Set within the hidden chambers and tunnels of Washington, D.C., Robert Langdon must decode the mysteries of the Freemasons to save his mentor Peter Solomon. Racing against time, he unravels cryptic symbols that could change the world's understanding of human potential.",
          genre: 'Thriller',
          price: 12.99,
          stock: 45,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          uuid: '123e4567-e89b-12d3-a456-426614174002',
          title: 'Digital Fortress',
          author: 'Dan Brown',
          isbn: '978-0312995423',
          description:
            "When the NSA's invincible code-breaking machine encounters a mysterious code it cannot break, the agency calls in its head cryptographer, Susan Fletcher. What she uncovers sends shock waves through the corridors of power, revealing a deadly conspiracy that could reshape the future of humanity.",
          genre: 'Techno-thriller',
          price: 8.99,
          stock: 30,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          uuid: '123e4567-e89b-12d3-a456-426614174003',
          title: 'The Hobbit',
          author: 'J.R.R. Tolkien',
          isbn: '978-0547928227',
          description:
            'Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely traveling any farther than his pantry or cellar. But his contentment is disturbed when the wizard Gandalf and a company of dwarves arrive on his doorstep to whisk him away on an adventure to raid the treasure hoard of Smaug the Magnificent, a large and very dangerous dragon.',
          genre: 'Fantasy',
          price: 14.99,
          stock: 60,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          uuid: '123e4567-e89b-12d3-a456-426614174004',
          title: 'Red Rising',
          author: 'Pierce Brown',
          isbn: '978-0345539786',
          description:
            'Darrow is a Red, a member of the lowest caste in a color-coded society of the future. Like his fellow Reds, he works all day, believing that he and his people are making the surface of Mars livable for future generations. But when he discovers that humanity reached the surface generations ago and that his people have been betrayed, he becomes determined to climb the ranks of Gold society to destroy it from within.',
          genre: 'Science Fiction',
          price: 14.99,
          stock: 60,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('books', null, {});
  },
};
