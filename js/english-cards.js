// A small starter deck. Each item has one unambiguous answer in its context.
window.NEUROLINGO_ENGLISH_CARDS = [
  ['Grammar', 'She ___ to work by train every day. (go)', 'goes', 'Use the present simple for routines. With she, add -es to go.'],
  ['Grammar', 'They ___ dinner when I called. (have)', 'were having', 'Use the past continuous for an action in progress when another happened.'],
  ['Grammar', 'I ___ this book twice. (read)', 'have read', 'Use the present perfect for experience without a stated time.'],
  ['Grammar', 'If it rains, we ___ at home. (stay)', 'will stay', 'In a first conditional, use the present simple after if and will in the result.'],
  ['Grammar', 'There ___ two chairs in the room. (be)', 'are', 'Use are with a plural noun.'],
  ['Grammar', 'This exercise is ___ than the last one. (easy)', 'easier', 'For short adjectives ending in y, change y to i and add -er.'],
  ['Grammar', 'She has worked here ___ 2020. (since / for)', 'since', 'Use since with the starting point of a period.'],
  ['Grammar', 'By the time we arrived, the film ___. (start)', 'had started', 'The past perfect marks an action completed before another past action.'],
  ['Vocabulary', 'Please ___ the lights when you leave. (switch / make)', 'switch off', 'Switch off means to stop a device or light from operating.'],
  ['Vocabulary', 'I need to ___ an appointment with the dentist. (make / do)', 'make', 'The usual expression is make an appointment.'],
  ['Vocabulary', 'Could you ___ me a hand with these bags? (give / take)', 'give', 'Give someone a hand means help them.'],
  ['Vocabulary', 'The opposite of “borrow” is ___.', 'lend', 'You borrow something from someone; you lend something to someone.'],
  ['Vocabulary', 'The meeting was ___ until Friday. (put off / put on)', 'put off', 'Put off means postpone.'],
  ['Vocabulary', 'I’m looking ___ my keys. I can’t find them. (for / after)', 'for', 'Look for means search for something.'],
  ['Everyday English', '“How are you?” “I’m well, ___.”', 'thanks', 'Thanks is a natural response when someone asks how you are.'],
  ['Everyday English', '“Could you repeat that, ___?”', 'please', 'Please makes a request more polite.'],
  ['Everyday English', '“Excuse me, how do I get ___ the station?” (to / at)', 'to', 'Use get to when asking about reaching a destination.'],
  ['Everyday English', '“Would you like some tea?” “Yes, ___.”', 'please', 'Yes, please is a polite way to accept an offer.'],
  ['Everyday English', '“I’m sorry I’m late.” “That’s ___.”', 'okay', 'That’s okay is a common way to accept an apology.'],
  ['Everyday English', '“Can I pay ___ card?” (by / with a)', 'by', 'Say pay by card, or pay with a card.']
].map(([category, front, back, explanation], index) => ({ id: `en-${index + 1}`, category, front, back, explanation }));
