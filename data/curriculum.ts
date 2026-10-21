import { GradeCurriculum, GeorgiaStandard, CurriculumLesson, CurriculumTopic } from '../types';

/**
 * Official Georgia K-12 Mathematics Standards Curriculum for Math Galaxy
 * Covers all Grades 1 to 12 with 4 comprehensive topics per grade (48 topics total).
 * Includes multi-step interactive visual scenes, formulas, worked examples, quick checks, and quizzes.
 */
export const GEORGIA_CURRICULUM: GradeCurriculum[] = [
  {
    "grade": 1,
    "gradeName": "Grade 1 — Foundations of Number Sense & Operations",
    "stage": "elementary",
    "description": "Counting to 120, place value of tens and ones, addition & subtraction within 20, shapes, and measurement.",
    "topics": [
      {
        "id": "g1-num-sense",
        "grade": 1,
        "stage": "elementary",
        "title": "Number Journeys & Counting to 120",
        "domain": "Numerical Reasoning (NR)",
        "standardCode": "1.NR.1",
        "description": "Count forward and backward within 120, bundle tens and ones, and compare two-digit numbers.",
        "icon": "🚀",
        "xpReward": 100,
        "lessons": [
          {
            "id": "g1-l1-counting",
            "topicId": "g1-num-sense",
            "grade": 1,
            "title": "Counting to 120 & Place Value Bundles of Ten",
            "standard": {
              "code": "1.NR.1.1",
              "domain": "Numerical Reasoning (NR)",
              "description": "Count forward and backward within 120 starting at any number and represent two-digit numbers as tens and ones.",
              "grade": 1
            },
            "objectives": [
              "Count forward and backward from any number up to 120.",
              "Group objects into bundles of 10 tens and leftover ones.",
              "Compare two-digit numbers using >, =, and <."
            ],
            "scenes": [
              {
                "id": "g1-l1-counting-s1",
                "title": "Step 1: Bundling Ones into Groups of Ten",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "When we count many stars, counting one by one takes a long time! Instead, we group every 10 single stars into 1 ten-rod.",
                "explanation": "Place value helps us organize numbers efficiently. Whenever we collect **10 ones**, we bundle them together to make **1 ten**. Any leftover stars stay in the **ones place**.",
                "formula": "$$\\text{Two-Digit Number} = (\\text{Tens} \\times 10) + \\text{Ones}$$",
                "workedExample": {
                  "problem": "Write the number made of 3 groups of ten and 6 single ones.",
                  "steps": [
                    "Count the tens: 3 groups of ten = $30$.",
                    "Count the leftover ones: 6 single units = $6$.",
                    "Combine tens and ones: $30 + 6 = 36$."
                  ],
                  "answer": "36 (3 tens and 6 ones)"
                },
                "quickCheck": {
                  "question": "What number is shown by 5 tens and 2 ones?",
                  "options": [
                    "52",
                    "25",
                    "502",
                    "7"
                  ],
                  "correctIndex": 0,
                  "explanation": "5 tens is 50, plus 2 ones gives 52."
                },
                "visualType": "number_line",
                "caption": "Grouping 10 ones into 1 ten-bundle along the number line."
              },
              {
                "id": "g1-l1-counting-s2",
                "title": "Step 2: Counting Forward & Backward Across 100",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "Moving right on the number line adds 1 each step. Moving left subtracts 1 each step, even when crossing 100 up to 120!",
                "explanation": "The pattern of ones digits ($0, 1, 2, 3, 4, 5, 6, 7, 8, 9$) repeats in every ten! After $99$ comes $100$, then $101, 102$, all the way to $120$.",
                "formula": "$$99 + 1 = 100, \\quad 100 + 1 = 101, \\quad 109 + 1 = 110$$",
                "workedExample": {
                  "problem": "Find the next three numbers when counting forward from 98.",
                  "steps": [
                    "Add 1 to 98 to get $99$.",
                    "Add 1 to 99 to complete the tenth bundle of ten: $100$.",
                    "Add 1 more to reach $101$."
                  ],
                  "answer": "99, 100, 101"
                },
                "quickCheck": {
                  "question": "Which number comes directly after 109 when counting forward by ones?",
                  "options": [
                    "110",
                    "108",
                    "200",
                    "119"
                  ],
                  "correctIndex": 0,
                  "explanation": "After 9 ones in 109 comes the next ten: 110."
                },
                "visualType": "number_line",
                "caption": "Stepping forward and backward by ones and tens."
              },
              {
                "id": "g1-l1-counting-s3",
                "title": "Step 3: Comparing Two-Digit Numbers (>, =, <)",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "To compare two numbers, always check the tens place first! If the tens are equal, then compare the ones place.",
                "explanation": "The alligator mouth always opens toward the **greater number**. For example, $62 > 49$ because $6$ tens is greater than $4$ tens.",
                "formula": "$$62 > 49 \\quad (\\text{since } 6\\text{ tens} > 4\\text{ tens})$$",
                "workedExample": {
                  "problem": "Compare 74 and 78 using <, >, or =.",
                  "steps": [
                    "Compare the tens digits: both numbers have $7$ tens ($70$).",
                    "Compare the ones digits: $4$ ones is less than $8$ ones.",
                    "Therefore, $74$ is less than $78$."
                  ],
                  "answer": "74 < 78"
                },
                "quickCheck": {
                  "question": "Which comparison statement is true?",
                  "options": [
                    "53 > 48",
                    "53 < 48",
                    "39 > 41",
                    "62 = 26"
                  ],
                  "correctIndex": 0,
                  "explanation": "53 has 5 tens while 48 has 4 tens, so 53 > 48."
                },
                "visualType": "number_line",
                "caption": "Numbers further to the right on a number line are greater."
              }
            ],
            "takeaways": [
              "Ten ones make 1 bundle of ten ($10 = 1\\text{ ten} + 0\\text{ ones}$).",
              "In a two-digit number like $47$, the first digit tells how many tens ($40$) and the second tells how many ones ($7$).",
              "When comparing two-digit numbers, always compare the tens place first."
            ],
            "quiz": {
              "topic": "Number Journeys & Counting to 120",
              "questions": [
                {
                  "question": "If you have 4 groups of 10 stars and 5 single stars, what number do you have?",
                  "options": [
                    "45",
                    "54",
                    "40",
                    "15"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "4 tens is 40, plus 5 ones makes 45."
                },
                {
                  "question": "What number comes directly before 30 when counting backwards?",
                  "options": [
                    "29",
                    "31",
                    "28",
                    "20"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "Counting backward 1 from 30 gives 29."
                },
                {
                  "question": "Which is greater: 5 tens (50) or 4 tens and 9 ones (49)?",
                  "options": [
                    "50 is greater",
                    "49 is greater",
                    "They are equal",
                    "Neither"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "50 has 5 tens, which is 1 more than 49."
                }
              ]
            },
            "xpReward": 100
          }
        ]
      },
      {
        "id": "g1-add-sub-20",
        "grade": 1,
        "stage": "elementary",
        "title": "Addition & Subtraction Within 20",
        "domain": "Numerical Reasoning (NR)",
        "standardCode": "1.NR.2",
        "description": "Use make-a-ten, doubles, and fact families to add and subtract fluently within 20.",
        "icon": "➕",
        "xpReward": 110,
        "lessons": [
          {
            "id": "g1-l2-make-ten",
            "topicId": "g1-add-sub-20",
            "grade": 1,
            "title": "Make-a-Ten & Fact Family Strategies",
            "standard": {
              "code": "1.NR.2.1",
              "domain": "Numerical Reasoning (NR)",
              "description": "Solve addition and subtraction problems within 20 using strategies such as making ten and relationship between addition and subtraction.",
              "grade": 1
            },
            "objectives": [
              "Use the Make-a-Ten strategy to add numbers whose sum is greater than 10.",
              "Understand how addition and subtraction are inverse operations in a fact family.",
              "Find missing addends in equations like $8 + \\square = 14$."
            ],
            "scenes": [
              {
                "id": "g1-l2-make-ten-s1",
                "title": "Step 1: The Make-a-Ten Strategy",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "Adding 8 plus 5 is super easy when we break 5 into 2 and 3. First 8 plus 2 makes 10, then 10 plus 3 makes 13!",
                "explanation": "Since $10$ is a friendly benchmark number, we decompose the second addend to **complete a full 10**, then add whatever is left.",
                "formula": "$$8 + 5 = 8 + (2 + 3) = (8 + 2) + 3 = 10 + 3 = 13$$",
                "workedExample": {
                  "problem": "Find $9 + 6$ by making a ten first.",
                  "steps": [
                    "Ask: How many more does $9$ need to make $10$? It needs $1$.",
                    "Break $6$ into $1 + 5$.",
                    "Add $9 + 1 = 10$, then $10 + 5 = 15$."
                  ],
                  "answer": "15"
                },
                "quickCheck": {
                  "question": "To solve $8 + 7$ by making 10, how should we split 7?",
                  "options": [
                    "2 and 5 (so 8 + 2 = 10)",
                    "1 and 6",
                    "3 and 4",
                    "7 and 0"
                  ],
                  "correctIndex": 0,
                  "explanation": "8 needs 2 to reach 10, so we split 7 into 2 + 5 to get 10 + 5 = 15."
                },
                "visualType": "number_line",
                "caption": "Jumping to 10 first on the number line, then adding the remainder."
              },
              {
                "id": "g1-l2-make-ten-s2",
                "title": "Step 2: Doubles and Near-Doubles",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "Knowing doubles like 6 plus 6 equals 12 helps you solve near-doubles like 6 plus 7 in a flash!",
                "explanation": "A **near-double** is just $1$ more or $1$ less than a double fact you already know by heart.",
                "formula": "$$6 + 6 = 12 \\implies 6 + 7 = (6 + 6) + 1 = 13$$",
                "workedExample": {
                  "problem": "Use the double fact $7 + 7 = 14$ to find $7 + 8$.",
                  "steps": [
                    "Recognize that $8$ is $1$ more than $7$.",
                    "Start with the known double: $7 + 7 = 14$.",
                    "Add $1$ more: $14 + 1 = 15$."
                  ],
                  "answer": "15"
                },
                "quickCheck": {
                  "question": "If $8 + 8 = 16$, what is $8 + 9$?",
                  "options": [
                    "17",
                    "15",
                    "18",
                    "16"
                  ],
                  "correctIndex": 0,
                  "explanation": "Since 9 is 1 more than 8, 8 + 9 is 1 more than 16, which is 17."
                },
                "visualType": "number_line",
                "caption": "Doubles and near-doubles on the number line."
              },
              {
                "id": "g1-l2-make-ten-s3",
                "title": "Step 3: Fact Families & Missing Addends",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "Addition and subtraction are partners! If 9 plus 4 equals 13, then 13 minus 9 must equal 4.",
                "explanation": "Whenever you have a subtraction problem like $14 - 8 = ?$, you can think of it as a missing-addend problem: **$8$ plus what number equals $14$?**",
                "formula": "$$a + b = c \\iff c - a = b \\quad \\text{and} \\quad c - b = a$$",
                "workedExample": {
                  "problem": "Find the missing number in $7 + \\square = 16$.",
                  "steps": [
                    "Rewrite as subtraction or count up from 7 to 16.",
                    "From 7, add 3 to reach 10, then add 6 more to reach 16.",
                    "Total added is $3 + 6 = 9$."
                  ],
                  "answer": "9"
                },
                "quickCheck": {
                  "question": "If $6 + 9 = 15$, what is $15 - 6$?",
                  "options": [
                    "9",
                    "6",
                    "21",
                    "8"
                  ],
                  "correctIndex": 0,
                  "explanation": "6, 9, and 15 form a fact family, so 15 - 6 = 9."
                },
                "visualType": "number_line",
                "caption": "Connecting forward addition jumps with backward subtraction jumps."
              }
            ],
            "takeaways": [
              "Making 10 first turns hard addition into an easy $10 + \\text{leftover}$ fact.",
              "Fact families use the same three numbers (e.g., $7 + 5 = 12$, $5 + 7 = 12$, $12 - 5 = 7$, $12 - 7 = 5$).",
              "The equal sign $=$ means both sides have the exact same value."
            ],
            "quiz": {
              "topic": "Addition & Subtraction Within 20",
              "questions": [
                {
                  "question": "What is $8 + 6$ using the Make-a-Ten strategy?",
                  "options": [
                    "14",
                    "13",
                    "15",
                    "12"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$8 + 2 = 10$, and $10 + 4 = 14$."
                },
                {
                  "question": "Which equation belongs to the same fact family as $9 + 5 = 14$?",
                  "options": [
                    "$14 - 9 = 5$",
                    "$14 + 5 = 19$",
                    "$9 - 5 = 4$",
                    "$14 - 4 = 10$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "A fact family uses the exact same three numbers: 9, 5, and 14."
                },
                {
                  "question": "Find the missing number: $17 - \\square = 10$.",
                  "options": [
                    "7",
                    "8",
                    "6",
                    "10"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$17 - 7 = 10$."
                }
              ]
            },
            "xpReward": 110
          }
        ]
      },
      {
        "id": "g1-shapes-shares",
        "grade": 1,
        "stage": "elementary",
        "title": "2D/3D Shapes & Equal Shares (Halves & Fourths)",
        "domain": "Geometric & Spatial Reasoning (GSR)",
        "standardCode": "1.GSR.4",
        "description": "Identify attributes of 2D/3D shapes and partition circles and rectangles into halves and fourths.",
        "icon": "🔷",
        "xpReward": 110,
        "lessons": [
          {
            "id": "g1-l3-shapes-halves",
            "topicId": "g1-shapes-shares",
            "grade": 1,
            "title": "Defining Shape Attributes, Halves & Fourths",
            "standard": {
              "code": "1.GSR.4.1",
              "domain": "Geometric & Spatial Reasoning (GSR)",
              "description": "Distinguish between defining attributes of shapes and partition circles and rectangles into two and four equal shares.",
              "grade": 1
            },
            "objectives": [
              "Identify shapes by number of closed sides and vertices (corners), not color or size.",
              "Partition circles and rectangles into 2 equal shares (halves) and 4 equal shares (fourths/quarters).",
              "Understand that cutting into more equal shares makes each piece smaller."
            ],
            "scenes": [
              {
                "id": "g1-l3-shapes-halves-s1",
                "title": "Step 1: Sides & Vertices of 2D Shapes",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "What makes a triangle a triangle? It isn't its color or whether it points up—it's having 3 straight closed sides and 3 corners called vertices!",
                "explanation": "**Defining attributes** tell us what a shape truly is: whether it is closed, how many straight sides it has, and how many **vertices** (corners) it has.",
                "formula": "$$\\text{Triangle} = 3\\text{ sides}, 3\\text{ vertices} \\quad | \\quad \\text{Rectangle} = 4\\text{ sides}, 4\\text{ square corners}$$",
                "workedExample": {
                  "problem": "A closed shape has 4 equal straight sides and 4 square corners. What shape is it?",
                  "steps": [
                    "Count the straight sides: 4 equal sides.",
                    "Check the corners: 4 square vertices.",
                    "Identify the shape: a square (which is also a special rectangle!)."
                  ],
                  "answer": "Square"
                },
                "quickCheck": {
                  "question": "Which attribute ALWAYS stays true for every triangle?",
                  "options": [
                    "It has 3 closed straight sides and 3 vertices",
                    "It is painted blue",
                    "It points straight up",
                    "It is larger than a coin"
                  ],
                  "correctIndex": 0,
                  "explanation": "Color, orientation, and size do not change a shape's classification—only its 3 closed sides and 3 vertices."
                },
                "visualType": "geometry_shapes",
                "caption": "Comparing sides, vertices, and angles of geometric figures."
              },
              {
                "id": "g1-l3-shapes-halves-s2",
                "title": "Step 2: Equal Shares — Halves and Fourths",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "If two astronauts share a pizza fairly, both pieces must be equal in size! Two equal pieces are called halves, and four equal pieces are called fourths.",
                "explanation": "A share is only a **half** or a **fourth** if all pieces have **equal area**. Splitting into 2 equal parts gives **halves**; splitting into 4 equal parts gives **fourths** (quarters).",
                "formula": "$$1\\text{ Whole} = 2\\text{ Halves} = 4\\text{ Fourths (Quarters)}$$",
                "workedExample": {
                  "problem": "A rectangular energy bar is cut into 4 equal sections. What do we call one section?",
                  "steps": [
                    "Verify all 4 sections are equal in size.",
                    "Name 1 out of 4 equal shares: one fourth (or one quarter)."
                  ],
                  "answer": "One fourth (or one quarter)"
                },
                "quickCheck": {
                  "question": "Which is larger: 1 half of a sandwich or 1 fourth of the same sandwich?",
                  "options": [
                    "1 half is larger",
                    "1 fourth is larger",
                    "They are the same size",
                    "Cannot tell"
                  ],
                  "correctIndex": 0,
                  "explanation": "Cutting a whole into more equal pieces makes each individual piece smaller, so 1 half > 1 fourth."
                },
                "visualType": "fraction_galaxy",
                "caption": "Partitioning wholes into 2 equal halves and 4 equal fourths."
              },
              {
                "id": "g1-l3-shapes-halves-s3",
                "title": "Step 3: Composing New Shapes & 3D Solids",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "We can put two right triangles together to build a rectangle, or stack 3D cubes and cylinders to build space stations!",
                "explanation": "3D solids have flat **faces** and curved surfaces: a **cube** has 6 square faces, a **cylinder** has 2 flat circular bases, and a **cone** has 1 circular base and 1 vertex.",
                "formula": "$$2\\text{ Right Triangles} \\longrightarrow 1\\text{ Rectangle}$$",
                "workedExample": {
                  "problem": "How many flat square faces does a standard 3D cube have?",
                  "steps": [
                    "Count top and bottom faces: 2.",
                    "Count front, back, left, and right faces: 4.",
                    "Add them together: $2 + 4 = 6$ square faces."
                  ],
                  "answer": "6 square faces"
                },
                "quickCheck": {
                  "question": "Which 3D shape has 2 flat circular faces and can roll?",
                  "options": [
                    "Cylinder",
                    "Cube",
                    "Rectangular Prism",
                    "Pyramid"
                  ],
                  "correctIndex": 0,
                  "explanation": "A cylinder has 2 flat circular bases connected by a curved surface."
                },
                "visualType": "geometry_shapes",
                "caption": "Composing 2D polygons and identifying 3D solid faces."
              }
            ],
            "takeaways": [
              "Defining attributes include closed sides and vertices (triangles have 3, rectangles have 4).",
              "Equal shares must be the exact same size: 2 equal parts are **halves**, 4 equal parts are **fourths**.",
              "One half ($1/2$) of a whole is larger than one fourth ($1/4$) of the same whole."
            ],
            "quiz": {
              "topic": "2D/3D Shapes & Equal Shares (Halves & Fourths)",
              "questions": [
                {
                  "question": "How many vertices (corners) does a hexagon have?",
                  "options": [
                    "6",
                    "4",
                    "5",
                    "8"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "A hexagon has 6 straight sides and 6 vertices."
                },
                {
                  "question": "When a circle is cut into 4 equal shares, what is each share called?",
                  "options": [
                    "One fourth (or one quarter)",
                    "One half",
                    "One third",
                    "One whole"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "4 equal shares are called fourths or quarters."
                },
                {
                  "question": "If you cut a pie into 4 equal pieces instead of 2 equal pieces, what happens to the size of each piece?",
                  "options": [
                    "Each piece gets smaller",
                    "Each piece gets larger",
                    "Each piece stays the same",
                    "The pie disappears"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "More equal shares means smaller individual pieces."
                }
              ]
            },
            "xpReward": 110
          }
        ]
      },
      {
        "id": "g1-measurement-data",
        "grade": 1,
        "stage": "elementary",
        "title": "Length, Time, Coins & Tally Charts",
        "domain": "Measurement & Data Reasoning (MDR)",
        "standardCode": "1.MDR.6",
        "description": "Measure length with non-standard units, tell time to the hour and half-hour, identify coins, and read charts.",
        "icon": "⏱️",
        "xpReward": 110,
        "lessons": [
          {
            "id": "g1-l4-measure-time",
            "topicId": "g1-measurement-data",
            "grade": 1,
            "title": "Measuring Length, Clocks & Data Graphs",
            "standard": {
              "code": "1.MDR.6.1",
              "domain": "Measurement & Data Reasoning (MDR)",
              "description": "Order objects by length, tell time to the hour and half-hour, and interpret tally charts and picture graphs.",
              "grade": 1
            },
            "objectives": [
              "Measure length using end-to-end unit tiles with no gaps or overlaps.",
              "Tell and write time to the hour (:00) and half-hour (:30) on analog and digital clocks.",
              "Ask and answer comparison questions ('how many more/fewer') from tally charts."
            ],
            "scenes": [
              {
                "id": "g1-l4-measure-time-s1",
                "title": "Step 1: Measuring Length Without Gaps or Overlaps",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "To measure a rocket wrench using paperclips, line the paperclips up end-to-end from start to finish with no spaces in between!",
                "explanation": "Accurate measurement requires three rules: start at the very edge, place identical units **end-to-end**, and leave **no gaps or overlaps**.",
                "formula": "$$\\text{Total Length} = \\text{Number of Equal End-to-End Units}$$",
                "workedExample": {
                  "problem": "Pencil A is 7 cubes long and Pencil B is 4 cubes long. How many cubes longer is Pencil A?",
                  "steps": [
                    "Find the length of Pencil A: $7$ cubes.",
                    "Find the length of Pencil B: $4$ cubes.",
                    "Subtract to compare: $7 - 4 = 3$ cubes longer."
                  ],
                  "answer": "3 cubes longer"
                },
                "quickCheck": {
                  "question": "Why must we avoid leaving gaps between cubes when measuring an object?",
                  "options": [
                    "Gaps make the count inaccurate and too small",
                    "Gaps make the cubes heavier",
                    "Gaps change the color",
                    "It does not matter"
                  ],
                  "correctIndex": 0,
                  "explanation": "Units must touch end-to-end so the full length is measured accurately."
                },
                "visualType": "number_line",
                "caption": "Measuring length along a ruler scale from 0 without gaps."
              },
              {
                "id": "g1-l4-measure-time-s2",
                "title": "Step 2: Telling Time to the Hour and Half-Hour",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "On an analog clock, the short hand tells the hour and the long hand tells the minutes. Halfway around the clock is 30 minutes!",
                "explanation": "When the long minute hand points straight up to **12**, it is `:00` (o'clock). When it points straight down to **6**, 30 minutes have passed (`:30`).",
                "formula": "$$\\text{Minute Hand on } 12 \\implies :00 \\quad | \\quad \\text{Minute Hand on } 6 \\implies :30$$",
                "workedExample": {
                  "problem": "The short hour hand is halfway between 3 and 4, and the long minute hand points to 6. What time is it?",
                  "steps": [
                    "Check the hour hand: it has passed 3, so the hour is $3$.",
                    "Check the minute hand: pointing to 6 means $30$ minutes.",
                    "Combine: $3:30$."
                  ],
                  "answer": "3:30 (Half past 3)"
                },
                "quickCheck": {
                  "question": "Where does the long minute hand point at 8:00?",
                  "options": [
                    "12",
                    "8",
                    "6",
                    "3"
                  ],
                  "correctIndex": 0,
                  "explanation": "At the exact hour (:00), the minute hand always points to 12."
                },
                "visualType": "geometry_shapes",
                "caption": "Circular clock rotation for hours and half-hours."
              },
              {
                "id": "g1-l4-measure-time-s3",
                "title": "Step 3: Reading Tally Charts & Picture Graphs",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "Tally marks bundle by fives: four vertical lines and a diagonal fifth slash make 5! That makes counting data super fast.",
                "explanation": "Once we count each category in a table, we can find the **total** by adding or find **how many more/fewer** by subtracting.",
                "formula": "$$\\text{How Many More} = \\text{Larger Category} - \\text{Smaller Category}$$",
                "workedExample": {
                  "problem": "In a class survey, 9 students chose Mars and 4 chose Jupiter. How many more students chose Mars?",
                  "steps": [
                    "Identify Mars votes: $9$.",
                    "Identify Jupiter votes: $4$.",
                    "Subtract: $9 - 4 = 5$ more students."
                  ],
                  "answer": "5 more students"
                },
                "quickCheck": {
                  "question": "What number does two groups of 5 tally marks plus 3 single tally marks represent?",
                  "options": [
                    "13",
                    "8",
                    "23",
                    "15"
                  ],
                  "correctIndex": 0,
                  "explanation": "5 + 5 + 3 = 13."
                },
                "visualType": "fraction_galaxy",
                "caption": "Comparing quantities visually across categories."
              }
            ],
            "takeaways": [
              "When measuring with unit blocks, align them end-to-end with zero gaps or overlaps.",
              "At the hour (`:00`), the minute hand points to $12$; at the half-hour (`:30`), it points to $6$.",
              "To find 'how many more' in a chart, subtract the smaller category from the larger category."
            ],
            "quiz": {
              "topic": "Length, Time, Coins & Tally Charts",
              "questions": [
                {
                  "question": "A ribbon is 9 paperclips long. A crayon is 5 paperclips long. How much longer is the ribbon?",
                  "options": [
                    "4 paperclips",
                    "14 paperclips",
                    "5 paperclips",
                    "3 paperclips"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$9 - 5 = 4$ paperclips longer."
                },
                {
                  "question": "If the digital clock reads $4:30$, where is the minute hand pointing?",
                  "options": [
                    "Pointing to the 6",
                    "Pointing to the 12",
                    "Pointing to the 4",
                    "Pointing to the 3"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "30 minutes is half an hour, which is at the 6 on a clock face."
                },
                {
                  "question": "How many cents is 1 dime and 3 pennies worth?",
                  "options": [
                    "13 cents",
                    "4 cents",
                    "31 cents",
                    "8 cents"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "A dime is 10 cents, plus 3 pennies (3 cents) equals 13 cents."
                }
              ]
            },
            "xpReward": 110
          }
        ]
      }
    ]
  },
  {
    "grade": 2,
    "gradeName": "Grade 2 — Place Value to 1,000 & Multi-Digit Fluency",
    "stage": "elementary",
    "description": "Hundreds, tens, and ones to 1,000, multi-digit addition & subtraction, arrays, and standard measurement.",
    "topics": [
      {
        "id": "g2-place-value",
        "grade": 2,
        "stage": "elementary",
        "title": "Place Value Up to 1,000",
        "domain": "Numerical Reasoning (NR)",
        "standardCode": "2.NR.1",
        "description": "Understand hundreds, tens, and ones in 3-digit numbers, expanded form, and skip-counting by 5s, 10s, and 100s.",
        "icon": "🪐",
        "xpReward": 120,
        "lessons": [
          {
            "id": "g2-l1-hundreds",
            "topicId": "g2-place-value",
            "grade": 2,
            "title": "Hundreds, Tens, Ones & Expanded Form",
            "standard": {
              "code": "2.NR.1.1",
              "domain": "Numerical Reasoning (NR)",
              "description": "Explain that 100 is a bundle of ten tens and represent three-digit numbers in standard, word, and expanded form.",
              "grade": 2
            },
            "objectives": [
              "Understand that 10 tens = 1 hundred ($100$) and 10 hundreds = 1 thousand ($1,000$).",
              "Write 3-digit numbers in expanded form (e.g., $482 = 400 + 80 + 2$).",
              "Compare 3-digit numbers using place value from left to right."
            ],
            "scenes": [
              {
                "id": "g2-l1-hundreds-s1",
                "title": "Step 1: Bundling 10 Tens into 1 Hundred",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "In our galaxy cargo bay, 10 single crystals make a ten-rod, and 10 ten-rods lock together to form a flat block of 100!",
                "explanation": "A three-digit number has three places from left to right: **Hundreds**, **Tens**, and **Ones**. Ten bundles of 10 always equal $100$.",
                "formula": "$$10\\text{ Ones} = 1\\text{ Ten}, \\quad 10\\text{ Tens} = 1\\text{ Hundred } (100)$$",
                "workedExample": {
                  "problem": "What is the value of the digit 6 in the number 649?",
                  "steps": [
                    "Identify the place of 6: it is in the leftmost (hundreds) place.",
                    "Multiply 6 by 100: $6 \\times 100 = 600$."
                  ],
                  "answer": "600"
                },
                "quickCheck": {
                  "question": "How many tens does it take to make 300?",
                  "options": [
                    "30 tens",
                    "3 tens",
                    "300 tens",
                    "13 tens"
                  ],
                  "correctIndex": 0,
                  "explanation": "Since 10 tens = 100, 30 tens = 300."
                },
                "visualType": "number_line",
                "caption": "Decomposing 3-digit numbers into hundreds, tens, and ones."
              },
              {
                "id": "g2-l1-hundreds-s2",
                "title": "Step 2: Standard Form vs. Expanded Form",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "Expanded form stretches a number out to show the exact value of its hundreds, tens, and ones!",
                "explanation": "Writing $738$ as $700 + 30 + 8$ is called **expanded form**. If a place has a zero, like $504$, the tens value is $0$, so $504 = 500 + 4$.",
                "formula": "$$738 = 700 + 30 + 8$$",
                "workedExample": {
                  "problem": "Write $800 + 0 + 9$ in standard three-digit form.",
                  "steps": [
                    "Put 8 in the hundreds place.",
                    "Put 0 in the tens place as a placeholder.",
                    "Put 9 in the ones place to get $809$."
                  ],
                  "answer": "809"
                },
                "quickCheck": {
                  "question": "What is the expanded form of 465?",
                  "options": [
                    "400 + 60 + 5",
                    "4 + 6 + 5",
                    "400 + 6 + 50",
                    "46 + 5"
                  ],
                  "correctIndex": 0,
                  "explanation": "4 hundreds (400) + 6 tens (60) + 5 ones (5)."
                },
                "visualType": "number_line",
                "caption": "Stretching place values across the number line."
              },
              {
                "id": "g2-l1-hundreds-s3",
                "title": "Step 3: Comparing Three-Digit Numbers",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "To compare 542 and 539, start at the hundreds place. Both have 5 hundreds, so look at the tens: 4 tens beats 3 tens!",
                "explanation": "Compare digits from **left to right**: first Hundreds, then Tens, then Ones.",
                "formula": "$$542 > 539 \\quad (\\text{same hundreds, } 4\\text{ tens} > 3\\text{ tens})$$",
                "workedExample": {
                  "problem": "Compare 681 and 687 using <, >, or =.",
                  "steps": [
                    "Hundreds are equal ($6 = 6$).",
                    "Tens are equal ($8 = 8$).",
                    "Compare ones: $1 < 7$, so $681 < 687$."
                  ],
                  "answer": "681 < 687"
                },
                "quickCheck": {
                  "question": "Which number is greatest: 799, 801, or 798?",
                  "options": [
                    "801",
                    "799",
                    "798",
                    "They are equal"
                  ],
                  "correctIndex": 0,
                  "explanation": "801 has 8 hundreds, whereas 799 and 798 only have 7 hundreds."
                },
                "visualType": "number_line",
                "caption": "Comparing hundreds, tens, and ones."
              }
            ],
            "takeaways": [
              "The position of a digit determines its value: Hundreds ($100$s), Tens ($10$s), Ones ($1$s).",
              "Expanded form shows the sum of each digit's place value: $352 = 300 + 50 + 2$.",
              "When comparing 3-digit numbers, check the hundreds digit first."
            ],
            "quiz": {
              "topic": "Place Value Up to 1,000",
              "questions": [
                {
                  "question": "What is the value of the digit 7 in 742?",
                  "options": [
                    "700",
                    "70",
                    "7",
                    "74"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "7 is in the hundreds place, so its value is 700."
                },
                {
                  "question": "Which comparison is correct?",
                  "options": [
                    "435 > 429",
                    "435 < 429",
                    "435 = 429",
                    "429 > 435"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "Both have 4 hundreds, and 3 tens is greater than 2 tens."
                },
                {
                  "question": "What number is equal to 5 hundreds, 0 tens, and 8 ones?",
                  "options": [
                    "508",
                    "580",
                    "58",
                    "805"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$500 + 0 + 8 = 508$."
                }
              ]
            },
            "xpReward": 120
          }
        ]
      },
      {
        "id": "g2-add-sub-100",
        "grade": 2,
        "stage": "elementary",
        "title": "Two-Digit Addition & Subtraction Regrouping",
        "domain": "Numerical Reasoning (NR)",
        "standardCode": "2.NR.2",
        "description": "Add and subtract two-digit numbers within 100 using place value decomposition and regrouping.",
        "icon": "🧮",
        "xpReward": 125,
        "lessons": [
          {
            "id": "g2-l2-regrouping",
            "topicId": "g2-add-sub-100",
            "grade": 2,
            "title": "Adding & Subtracting Two-Digit Numbers",
            "standard": {
              "code": "2.NR.2.1",
              "domain": "Numerical Reasoning (NR)",
              "description": "Fluently add and subtract within 100 using strategies based on place value and regrouping.",
              "grade": 2
            },
            "objectives": [
              "Add two-digit numbers by adding tens with tens and ones with ones.",
              "Regroup 10 ones into 1 new ten when the ones sum is 10 or more.",
              "Unbundle 1 ten into 10 ones when subtracting requires regrouping."
            ],
            "scenes": [
              {
                "id": "g2-l2-regrouping-s1",
                "title": "Step 1: Adding by Place Value (Partial Sums)",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "To add 34 plus 25, add the tens first (30 plus 20 is 50), then add the ones (4 plus 5 is 9) to get 59!",
                "explanation": "**Partial sums** lets us add from left to right: combine the tens together, combine the ones together, then add the two totals.",
                "formula": "$$34 + 25 = (30 + 20) + (4 + 5) = 50 + 9 = 59$$",
                "workedExample": {
                  "problem": "Add $42 + 36$ using place value.",
                  "steps": [
                    "Add the tens: $40 + 30 = 70$.",
                    "Add the ones: $2 + 6 = 8$.",
                    "Combine: $70 + 8 = 78$."
                  ],
                  "answer": "78"
                },
                "quickCheck": {
                  "question": "What is $51 + 27$?",
                  "options": [
                    "78",
                    "76",
                    "88",
                    "68"
                  ],
                  "correctIndex": 0,
                  "explanation": "50 + 20 = 70, and 1 + 7 = 8, so 70 + 8 = 78."
                },
                "visualType": "number_line",
                "caption": "Jumping by tens and then ones on an open number line."
              },
              {
                "id": "g2-l2-regrouping-s2",
                "title": "Step 2: Regrouping When Ones Make a New Ten",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "What if the ones add up to 10 or more, like in 48 plus 26? 8 plus 6 is 14, which is 1 new ten and 4 ones!",
                "explanation": "Whenever the ones column reaches $10$ or higher, we **regroup (carry)** $10$ ones into $1$ ten in the tens column.",
                "formula": "$$48 + 26 = (40 + 20) + (8 + 6) = 60 + 14 = 74$$",
                "workedExample": {
                  "problem": "Find $37 + 45$.",
                  "steps": [
                    "Add the ones: $7 + 5 = 12$ ($1$ ten and $2$ ones).",
                    "Add the tens plus the regrouped ten: $30 + 40 + 10 = 80$.",
                    "Combine: $80 + 2 = 82$."
                  ],
                  "answer": "82"
                },
                "quickCheck": {
                  "question": "What is $29 + 34$?",
                  "options": [
                    "63",
                    "53",
                    "64",
                    "513"
                  ],
                  "correctIndex": 0,
                  "explanation": "20 + 30 = 50 and 9 + 4 = 13; 50 + 13 = 63."
                },
                "visualType": "number_line",
                "caption": "Regrouping 10 ones into an extra ten jump."
              },
              {
                "id": "g2-l2-regrouping-s3",
                "title": "Step 3: Subtracting Two-Digit Numbers with Regrouping",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "In 62 minus 27, we can't take 7 ones from 2 ones right away—so we unbundle 1 ten from 60 to get 5 tens and 12 ones!",
                "explanation": "Unbundling $1$ ten into $10$ ones changes $62$ into $50 + 12$ without changing its total value. Then $12 - 7 = 5$ and $50 - 20 = 30$.",
                "formula": "$$62 - 27 = (50 - 20) + (12 - 7) = 30 + 5 = 35$$",
                "workedExample": {
                  "problem": "Subtract $54 - 18$.",
                  "steps": [
                    "Unbundle 1 ten from 54: now we have $4$ tens and $14$ ones.",
                    "Subtract ones: $14 - 8 = 6$.",
                    "Subtract tens: $4 - 1 = 3$ tens ($30$). Total = $36$."
                  ],
                  "answer": "36"
                },
                "quickCheck": {
                  "question": "What is $71 - 25$?",
                  "options": [
                    "46",
                    "54",
                    "56",
                    "44"
                  ],
                  "correctIndex": 0,
                  "explanation": "Unbundle 71 into 60 + 11. Then 11 - 5 = 6 and 60 - 20 = 40, giving 46."
                },
                "visualType": "number_line",
                "caption": "Counting back and unbundling tens for subtraction."
              }
            ],
            "takeaways": [
              "Breaking numbers into tens and ones ($47 + 25 = 60 + 12 = 72$) makes mental math clear.",
              "If the ones digits add up to $10$ or more, regroup $10$ ones into $1$ ten.",
              "You can always check subtraction by adding the difference and the subtracted number."
            ],
            "quiz": {
              "topic": "Two-Digit Addition & Subtraction Regrouping",
              "questions": [
                {
                  "question": "What is $46 + 38$?",
                  "options": [
                    "84",
                    "74",
                    "82",
                    "714"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$40 + 30 = 70$ and $6 + 8 = 14$; $70 + 14 = 84$."
                },
                {
                  "question": "Solve $63 - 28$.",
                  "options": [
                    "35",
                    "45",
                    "38",
                    "43"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$50 - 20 = 30$ and $13 - 8 = 5$, making $35$."
                },
                {
                  "question": "A spacecraft has 80 fuel cells and uses 34. How many remain?",
                  "options": [
                    "46",
                    "56",
                    "54",
                    "44"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$80 - 34 = 46$."
                }
              ]
            },
            "xpReward": 125
          }
        ]
      },
      {
        "id": "g2-arrays-patterns",
        "grade": 2,
        "stage": "elementary",
        "title": "Even/Odd Numbers & Rectangular Arrays",
        "domain": "Patterning & Algebraic Reasoning (PAR)",
        "standardCode": "2.PAR.4",
        "description": "Determine whether a group of objects is even or odd and use repeated addition to count rectangular arrays up to 5x5.",
        "icon": "⚡",
        "xpReward": 125,
        "lessons": [
          {
            "id": "g2-l3-even-odd-arrays",
            "topicId": "g2-arrays-patterns",
            "grade": 2,
            "title": "Even & Odd Pairing and Rectangular Arrays",
            "standard": {
              "code": "2.PAR.4.1",
              "domain": "Patterning & Algebraic Reasoning (PAR)",
              "description": "Pair objects to determine even/odd numbers and write repeated addition equations for rectangular arrays.",
              "grade": 2
            },
            "objectives": [
              "Identify even numbers as having pairs with 0 left over (ending in 0, 2, 4, 6, 8).",
              "Identify odd numbers as having 1 left over when paired (ending in 1, 3, 5, 7, 9).",
              "Write repeated addition equations for rows and columns in an array."
            ],
            "scenes": [
              {
                "id": "g2-l3-even-odd-arrays-s1",
                "title": "Step 1: Even and Odd Numbers by Pairing",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "If every astronaut has a partner with nobody left out, the number is EVEN! If 1 astronaut is left without a partner, the number is ODD.",
                "explanation": "You only need to check the **ones digit** to know if any number is even or odd: **Even** ends in $0, 2, 4, 6, 8$; **Odd** ends in $1, 3, 5, 7, 9$.",
                "formula": "$$\\text{Even} = n + n \\quad | \\quad \\text{Odd} = n + n + 1$$",
                "workedExample": {
                  "problem": "Is 14 even or odd? Write a doubles equation to prove it.",
                  "steps": [
                    "Check the ones digit of 14: it is $4$ (even).",
                    "Split 14 into two equal groups: $7 + 7 = 14$ with $0$ left over."
                  ],
                  "answer": "Even (7 + 7 = 14)"
                },
                "quickCheck": {
                  "question": "Which of these numbers is ODD?",
                  "options": [
                    "27",
                    "18",
                    "34",
                    "40"
                  ],
                  "correctIndex": 0,
                  "explanation": "27 ends in 7, which cannot be paired evenly (13 + 13 + 1)."
                },
                "visualType": "fraction_galaxy",
                "caption": "Visualizing equal pairs vs. odd leftovers."
              },
              {
                "id": "g2-l3-even-odd-arrays-s2",
                "title": "Step 2: Rows and Columns in Rectangular Arrays",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "Rows go across from left to right, and columns go up and down! A grid of 3 rows with 4 stars in each row has 4 + 4 + 4 = 12 stars.",
                "explanation": "A **rectangular array** organizes objects into equal **rows** (horizontal) and equal **columns** (vertical).",
                "formula": "$$3\\text{ rows of } 4 = 4 + 4 + 4 = 12$$",
                "workedExample": {
                  "problem": "Write a repeated addition equation for an array with 4 rows and 5 columns.",
                  "steps": [
                    "Each of the 4 rows has 5 objects.",
                    "Add 5 four times: $5 + 5 + 5 + 5 = 20$."
                  ],
                  "answer": "5 + 5 + 5 + 5 = 20"
                },
                "quickCheck": {
                  "question": "How many total tiles are in an array with 3 rows of 5?",
                  "options": [
                    "15",
                    "8",
                    "12",
                    "20"
                  ],
                  "correctIndex": 0,
                  "explanation": "5 + 5 + 5 = 15 tiles."
                },
                "visualType": "fraction_galaxy",
                "caption": "Equal rows and columns in a rectangular array."
              },
              {
                "id": "g2-l3-even-odd-arrays-s3",
                "title": "Step 3: Adding by Rows vs. Adding by Columns",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "Whether you add by rows (4 + 4 + 4) or add by columns (3 + 3 + 3 + 3), the total number of items in the array stays 12!",
                "explanation": "Rotating an array swaps its rows and columns, proving that both repeated addition equations give the exact same sum.",
                "formula": "$$4 + 4 + 4 = 3 + 3 + 3 + 3 = 12$$",
                "workedExample": {
                  "problem": "An array has 2 rows of 6. Write the repeated addition by rows and by columns.",
                  "steps": [
                    "By 2 rows of 6: $6 + 6 = 12$.",
                    "By 6 columns of 2: $2 + 2 + 2 + 2 + 2 + 2 = 12$."
                  ],
                  "answer": "Both equal 12"
                },
                "quickCheck": {
                  "question": "Which repeated addition matches 5 rows of 3?",
                  "options": [
                    "3 + 3 + 3 + 3 + 3 = 15",
                    "5 + 3 = 8",
                    "5 + 5 = 10",
                    "3 + 3 = 6"
                  ],
                  "correctIndex": 0,
                  "explanation": "5 rows with 3 in each row is 3 added 5 times: 15."
                },
                "visualType": "fraction_galaxy",
                "caption": "Equivalence of row sums and column sums."
              }
            ],
            "takeaways": [
              "An **even number** can be written as a double ($n + n$) with zero leftovers.",
              "An **odd number** always has $1$ leftover when grouped into pairs.",
              "An array with $r$ rows and $c$ columns has total items found by repeated addition."
            ],
            "quiz": {
              "topic": "Even/Odd Numbers & Rectangular Arrays",
              "questions": [
                {
                  "question": "Which equation shows that 16 is an even number?",
                  "options": [
                    "$8 + 8 = 16$",
                    "$10 + 6 = 16$",
                    "$15 + 1 = 16$",
                    "$9 + 7 = 16$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "Even numbers can be expressed as the sum of two equal addends (doubles)."
                },
                {
                  "question": "A solar array has 4 rows with 4 panels in each row. How many panels in all?",
                  "options": [
                    "16",
                    "8",
                    "12",
                    "20"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$4 + 4 + 4 + 4 = 16$."
                },
                {
                  "question": "When you add two odd numbers together (like $3 + 5$), is the sum even or odd?",
                  "options": [
                    "Always Even",
                    "Always Odd",
                    "Zero",
                    "Cannot tell"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "The two leftover single ones pair up together, making an even sum ($3 + 5 = 8$)."
                }
              ]
            },
            "xpReward": 125
          }
        ]
      },
      {
        "id": "g2-measurement-money",
        "grade": 2,
        "stage": "elementary",
        "title": "Standard Rulers, Money & Line Plots",
        "domain": "Measurement & Data Reasoning (MDR)",
        "standardCode": "2.MDR.5",
        "description": "Measure lengths in inches, feet, centimeters, and meters, solve coin & dollar word problems, and read line plots.",
        "icon": "📏",
        "xpReward": 125,
        "lessons": [
          {
            "id": "g2-l4-rulers-coins",
            "topicId": "g2-measurement-money",
            "grade": 2,
            "title": "Measuring in Inches/Centimeters & Counting Coins",
            "standard": {
              "code": "2.MDR.5.1",
              "domain": "Measurement & Data Reasoning (MDR)",
              "description": "Measure length using standard rulers and solve word problems involving quarters, dimes, nickels, and pennies.",
              "grade": 2
            },
            "objectives": [
              "Measure length in inches (in), feet (ft), centimeters (cm), and meters (m).",
              "Compare unit sizes (1 inch is longer than 1 centimeter, so a length takes fewer inches than centimeters).",
              "Count mixed collections of quarters ($25\\text{¢}$), dimes ($10\\text{¢}$), nickels ($5\\text{¢}$), and pennies ($1\\text{¢}$)."
            ],
            "scenes": [
              {
                "id": "g2-l4-rulers-coins-s1",
                "title": "Step 1: Using Standard Rulers (Inches & Centimeters)",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "Line the start of your object with the 0 mark on the ruler. What if your ruler is broken and starts at 2? Just subtract 2 from the ending mark!",
                "explanation": "Length is the distance between two marks on a number line: $\\text{Length} = \\text{End Mark} - \\text{Start Mark}$.",
                "formula": "$$\\text{Length} = x_{\\text{end}} - x_{\\text{start}}$$",
                "workedExample": {
                  "problem": "A bolt starts at the 3-inch mark on a ruler and ends at the 9-inch mark. How long is the bolt?",
                  "steps": [
                    "Identify the ending mark: $9$ inches.",
                    "Identify the starting mark: $3$ inches.",
                    "Subtract: $9 - 3 = 6$ inches."
                  ],
                  "answer": "6 inches"
                },
                "quickCheck": {
                  "question": "Since 1 centimeter is smaller than 1 inch, measuring a book in centimeters gives a number that is...",
                  "options": [
                    "Greater than the number of inches",
                    "Less than the number of inches",
                    "Exactly the same",
                    "Zero"
                  ],
                  "correctIndex": 0,
                  "explanation": "Smaller units take more copies to cover the same distance."
                },
                "visualType": "number_line",
                "caption": "Finding length as distance along a ruler number line."
              },
              {
                "id": "g2-l4-rulers-coins-s2",
                "title": "Step 2: Counting Quarters, Dimes, Nickels & Pennies",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "Start with the biggest coins first! Two quarters make 50 cents, plus two dimes makes 70 cents, plus a nickel makes 75 cents!",
                "explanation": "Coin values: **Quarter** = $25\\text{¢}$, **Dime** = $10\\text{¢}$, **Nickel** = $5\\text{¢}$, **Penny** = $1\\text{¢}$. Four quarters equal $100\\text{¢} = \\$1.00$.",
                "formula": "$$25\\text{¢ (Q)} + 10\\text{¢ (D)} + 5\\text{¢ (N)} + 1\\text{¢ (P)}$$",
                "workedExample": {
                  "problem": "Find the total value of 1 quarter, 3 dimes, and 1 nickel.",
                  "steps": [
                    "Start with 1 quarter: $25\\text{¢}$.",
                    "Count on 3 dimes (+30¢): $25 + 10 + 10 + 10 = 55\\text{¢}$.",
                    "Add 1 nickel (+5¢): $55 + 5 = 60\\text{¢}$."
                  ],
                  "answer": "60 cents"
                },
                "quickCheck": {
                  "question": "How much money is 2 quarters, 1 dime, and 2 pennies?",
                  "options": [
                    "62¢",
                    "52¢",
                    "37¢",
                    "72¢"
                  ],
                  "correctIndex": 0,
                  "explanation": "50¢ (2 quarters) + 10¢ (1 dime) + 2¢ (2 pennies) = 62¢."
                },
                "visualType": "number_line",
                "caption": "Skip-counting coin values up to 100 cents."
              },
              {
                "id": "g2-l4-rulers-coins-s3",
                "title": "Step 3: Reading Measurement Line Plots",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "A line plot places an X above a number line each time a measurement appears. The tallest stack of X's shows the most common length!",
                "explanation": "Each **X** on a line plot represents **1 object** with that measurement value.",
                "formula": "$$\\text{Total Objects Measured} = \\text{Total Number of X Marks}$$",
                "workedExample": {
                  "problem": "On a plant height line plot, there are 2 X's above 4 inches, 5 X's above 5 inches, and 1 X above 6 inches. How many plants were measured?",
                  "steps": [
                    "Count the X marks at each number: $2 + 5 + 1$.",
                    "Sum them: $2 + 5 + 1 = 8$ plants."
                  ],
                  "answer": "8 plants"
                },
                "quickCheck": {
                  "question": "In the example above, what was the most common plant height?",
                  "options": [
                    "5 inches (it has 5 X's)",
                    "6 inches",
                    "4 inches",
                    "8 inches"
                  ],
                  "correctIndex": 0,
                  "explanation": "The value with the most X marks (5 inches) is the most frequent measurement."
                },
                "visualType": "number_line",
                "caption": "Plotting frequency of measurements along a number line."
              }
            ],
            "takeaways": [
              "Always line the object's left edge up with the **$0$ mark** on the ruler.",
              "Smaller units (cm) require **more** units to measure the same object than larger units (in).",
              "Count coins from highest value to lowest value: Quarters ($25\\text{¢}$) $\\to$ Dimes ($10\\text{¢}$) $\\to$ Nickels ($5\\text{¢}$) $\\to$ Pennies ($1\\text{¢}$)."
            ],
            "quiz": {
              "topic": "Standard Rulers, Money & Line Plots",
              "questions": [
                {
                  "question": "A toy rocket starts at the 2 cm mark on a ruler and ends at the 11 cm mark. How long is it?",
                  "options": [
                    "9 cm",
                    "11 cm",
                    "13 cm",
                    "2 cm"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$11 - 2 = 9\\text{ cm}$."
                },
                {
                  "question": "How many cents do 3 quarters equal?",
                  "options": [
                    "75¢",
                    "50¢",
                    "30¢",
                    "100¢"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$25 + 25 + 25 = 75\\text{¢}$."
                },
                {
                  "question": "If you have $1.00 (100¢) and buy a sticker for 65¢, how much change do you get?",
                  "options": [
                    "35¢",
                    "45¢",
                    "25¢",
                    "40¢"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$100 - 65 = 35\\text{¢}$."
                }
              ]
            },
            "xpReward": 125
          }
        ]
      }
    ]
  },
  {
    "grade": 3,
    "gradeName": "Grade 3 — Multiplication, Division, Fractions & Area",
    "stage": "elementary",
    "description": "Multiplication & division within 100, unit fractions on number lines, area & perimeter, and elapsed time.",
    "topics": [
      {
        "id": "g3-mult-div",
        "grade": 3,
        "stage": "elementary",
        "title": "Multiplication & Division Concepts",
        "domain": "Patterning & Algebraic Reasoning (PAR)",
        "standardCode": "3.PAR.3",
        "description": "Understand multiplication as equal groups and arrays, division as inverse sharing, and apply properties of operations.",
        "icon": "⚡",
        "xpReward": 130,
        "lessons": [
          {
            "id": "g3-l1-multiplication",
            "topicId": "g3-mult-div",
            "grade": 3,
            "title": "Equal Groups, Arrays & Inverse Division",
            "standard": {
              "code": "3.PAR.3.1",
              "domain": "Patterning & Algebraic Reasoning (PAR)",
              "description": "Represent multiplication and division within 100 using equal groups, arrays, and properties of operations.",
              "grade": 3
            },
            "objectives": [
              "Model multiplication $a \\times b$ as $a$ equal groups of $b$ or an array.",
              "Apply the Commutative ($a \\times b = b \\times a$) and Distributive properties.",
              "Use inverse multiplication facts to solve division equations ($24 \\div 4 = 6$ because $4 \\times 6 = 24$)."
            ],
            "scenes": [
              {
                "id": "g3-l1-multiplication-s1",
                "title": "Step 1: Equal Groups & Array Grids",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "When our space station needs power, we arrange solar panels in neat grids: 4 rows of 6 panels give 4 times 6 equals 24 panels!",
                "explanation": "Instead of adding $6 + 6 + 6 + 6$, **multiplication** counts equal groups rapidly: $\\text{Rows} \\times \\text{Columns} = \\text{Total Product}$.",
                "formula": "$$4 \\times 6 = 6 + 6 + 6 + 6 = 24$$",
                "workedExample": {
                  "problem": "A crate holds 5 rows of 7 oxygen tanks. How many tanks are in the crate?",
                  "steps": [
                    "Identify number of rows: $5$.",
                    "Identify number per row: $7$.",
                    "Multiply: $5 \\times 7 = 35$ tanks."
                  ],
                  "answer": "35 oxygen tanks"
                },
                "quickCheck": {
                  "question": "Which multiplication expression matches $8 + 8 + 8$?",
                  "options": [
                    "3 × 8 = 24",
                    "8 × 8 = 64",
                    "3 + 8 = 11",
                    "4 × 8 = 32"
                  ],
                  "correctIndex": 0,
                  "explanation": "Three equal groups of 8 is written as 3 × 8 = 24."
                },
                "visualType": "fraction_galaxy",
                "caption": "Array model of equal rows and columns."
              },
              {
                "id": "g3-l1-multiplication-s2",
                "title": "Step 2: The Distributive Property Shortcut",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "Don't know 6 times 8 yet? Break 8 into 5 plus 3! Then 6 times 5 is 30, and 6 times 3 is 18. Add them to get 48!",
                "explanation": "The **Distributive Property** lets you split a tricky factor into two friendly parts (like $5$ and something), multiply both parts, and add the products.",
                "formula": "$$a \\times (b + c) = (a \\times b) + (a \\times c)$$",
                "workedExample": {
                  "problem": "Evaluate $7 \\times 6$ by splitting $6$ into $5 + 1$.",
                  "steps": [
                    "Multiply the first part: $7 \\times 5 = 35$.",
                    "Multiply the second part: $7 \\times 1 = 7$.",
                    "Add the partial products: $35 + 7 = 42$."
                  ],
                  "answer": "42"
                },
                "quickCheck": {
                  "question": "Which expression is equivalent to $8 \\times 7$ using the Distributive Property?",
                  "options": [
                    "(8 × 5) + (8 × 2)",
                    "(8 + 5) × (8 + 2)",
                    "(8 × 5) + 2",
                    "8 × 5 × 2"
                  ],
                  "correctIndex": 0,
                  "explanation": "Since 7 = 5 + 2, 8 × 7 = (8 × 5) + (8 × 2) = 40 + 16 = 56."
                },
                "visualType": "fraction_galaxy",
                "caption": "Splitting an array into two smaller rectangles."
              },
              {
                "id": "g3-l1-multiplication-s3",
                "title": "Step 3: Division as Unknown-Factor Multiplication",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "To solve 36 divided by 9, ask yourself: 9 times WHAT number equals 36? Since 9 times 4 is 36, the quotient is 4!",
                "explanation": "Every division problem $\\text{Total} \\div \\text{Groups} = \\text{Size}$ is the exact reverse of a multiplication fact.",
                "formula": "$$36 \\div 9 = 4 \\iff 9 \\times 4 = 36$$",
                "workedExample": {
                  "problem": "Share 45 energy cells equally among 5 lunar rovers. How many cells does each rover get?",
                  "steps": [
                    "Set up division: $45 \\div 5 = ?$",
                    "Think of the multiplication table for 5: $5 \\times 9 = 45$.",
                    "Each rover receives $9$ cells."
                  ],
                  "answer": "9 energy cells"
                },
                "quickCheck": {
                  "question": "If $7 \\times 8 = 56$, what is $56 \\div 7$?",
                  "options": [
                    "8",
                    "7",
                    "9",
                    "49"
                  ],
                  "correctIndex": 0,
                  "explanation": "Multiplication and division are inverse operations: 56 ÷ 7 = 8."
                },
                "visualType": "number_line",
                "caption": "Equal jumps on a number line for multiplication and division."
              }
            ],
            "takeaways": [
              "Multiplication combines equal groups; division splits a total into equal groups.",
              "Distributive Property breaks large factors apart: $7 \\times 8 = 7 \\times (5 + 3) = 35 + 21 = 56$.",
              "Multiplication and division form inverse fact families."
            ],
            "quiz": {
              "topic": "Multiplication & Division Concepts",
              "questions": [
                {
                  "question": "What is $6 \\times 7$?",
                  "options": [
                    "42",
                    "36",
                    "48",
                    "40"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "6 groups of 7 equals 42."
                },
                {
                  "question": "If 24 crystals are divided equally into 4 pods, how many are in each pod?",
                  "options": [
                    "6",
                    "8",
                    "4",
                    "5"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$24 \\div 4 = 6$."
                },
                {
                  "question": "Which property explains why $3 \\times 8 = 8 \\times 3$?",
                  "options": [
                    "Commutative Property",
                    "Identity Property",
                    "Zero Property",
                    "Associative Property"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "The Commutative Property allows swapping the order of factors."
                }
              ]
            },
            "xpReward": 130
          }
        ]
      },
      {
        "id": "g3-unit-fractions",
        "grade": 3,
        "stage": "elementary",
        "title": "Unit Fractions & Fractions on a Number Line",
        "domain": "Numerical Reasoning (NR)",
        "standardCode": "3.NR.4",
        "description": "Represent unit fractions 1/b as equal parts of a whole and plot fractions on a number line from 0 to 1.",
        "icon": "🍕",
        "xpReward": 135,
        "lessons": [
          {
            "id": "g3-l2-fractions-intro",
            "topicId": "g3-unit-fractions",
            "grade": 3,
            "title": "Numerators, Denominators & Number Line Fractions",
            "standard": {
              "code": "3.NR.4.1",
              "domain": "Numerical Reasoning (NR)",
              "description": "Understand a fraction a/b as a copies of unit fraction 1/b and locate fractions on a number line.",
              "grade": 3
            },
            "objectives": [
              "Understand the denominator $b$ as the total number of equal parts in 1 whole.",
              "Understand the numerator $a$ as the number of counted unit parts of size $1/b$.",
              "Locate fractions on a number line partitioned into $b$ equal intervals between $0$ and $1$."
            ],
            "scenes": [
              {
                "id": "g3-l2-fractions-intro-s1",
                "title": "Step 1: Unit Fractions (1/b) & Equal Parts",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "When 1 whole fuel bar is cut into 4 equal pieces, each single piece is the unit fraction 1/4. Three of those pieces make 3/4!",
                "explanation": "In a fraction $\\frac{a}{b}$, the bottom number (**denominator** $b$) tells how many equal pieces make $1$ whole. The top number (**numerator** $a$) tells how many pieces we have.",
                "formula": "$$\\frac{3}{4} = \\frac{1}{4} + \\frac{1}{4} + \\frac{1}{4}$$",
                "workedExample": {
                  "problem": "A circle is divided into 6 equal slices and 5 slices are shaded. Write the fraction.",
                  "steps": [
                    "Total equal slices in 1 whole (denominator): $6$.",
                    "Number of shaded slices (numerator): $5$.",
                    "Write the fraction: $\\frac{5}{6}$."
                  ],
                  "answer": "5/6"
                },
                "quickCheck": {
                  "question": "Which fraction is a unit fraction?",
                  "options": [
                    "1/8",
                    "3/4",
                    "2/2",
                    "5/6"
                  ],
                  "correctIndex": 0,
                  "explanation": "A unit fraction always has a numerator of 1."
                },
                "visualType": "fraction_galaxy",
                "caption": "Building fractions from unit fraction blocks."
              },
              {
                "id": "g3-l2-fractions-intro-s2",
                "title": "Step 2: Fractions on a Number Line",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "To plot fourths on a number line between 0 and 1, divide the space from 0 to 1 into 4 equal jumps. Each jump is 1/4!",
                "explanation": "Count the **equal spaces (intervals)** between $0$ and $1$, not just the tick marks! Notice that $\\frac{4}{4}$ lands right on $1$ whole.",
                "formula": "$$0 = \\frac{0}{4}, \\quad \\frac{1}{4}, \\quad \\frac{2}{4} = \\frac{1}{2}, \\quad \\frac{3}{4}, \\quad \\frac{4}{4} = 1$$",
                "workedExample": {
                  "problem": "The segment from 0 to 1 is split into 3 equal spaces. What fraction is at the second tick mark after 0?",
                  "steps": [
                    "Each space has length $\\frac{1}{3}$.",
                    "Two jumps from 0 lands at $\\frac{2}{3}$."
                  ],
                  "answer": "2/3"
                },
                "quickCheck": {
                  "question": "Which fraction is equal to 1 whole?",
                  "options": [
                    "6/6",
                    "1/6",
                    "5/6",
                    "0/6"
                  ],
                  "correctIndex": 0,
                  "explanation": "When the numerator and denominator are equal (6/6), you have all parts of 1 whole."
                },
                "visualType": "number_line",
                "caption": "Partitioning the interval [0, 1] into equal fractional jumps."
              },
              {
                "id": "g3-l2-fractions-intro-s3",
                "title": "Step 3: Comparing Fractions with Same Numerator or Denominator",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "Would you rather have 1/2 of a pizza or 1/8 of the same pizza? 1/2 is much bigger because cutting into fewer pieces keeps each piece large!",
                "explanation": "- **Same Denominator**: Larger numerator wins ($\\frac{5}{8} > \\frac{3}{8}$).\n- **Same Numerator**: Smaller denominator wins because each slice is larger ($\\frac{1}{2} > \\frac{1}{8}$).",
                "formula": "$$\\frac{5}{8} > \\frac{3}{8} \\quad \\text{and} \\quad \\frac{2}{3} > \\frac{2}{6}$$",
                "workedExample": {
                  "problem": "Compare $\\frac{3}{4}$ and $\\frac{3}{8}$ using > or <.",
                  "steps": [
                    "Both fractions have the same numerator ($3$ pieces).",
                    "Compare piece sizes: fourths ($\\frac{1}{4}$) are twice as big as eighths ($\\frac{1}{8}$).",
                    "Therefore, $3$ fourths is greater than $3$ eighths."
                  ],
                  "answer": "3/4 > 3/8"
                },
                "quickCheck": {
                  "question": "Which fraction is GREATER: $\\frac{1}{3}$ or $\\frac{1}{6}$?",
                  "options": [
                    "1/3",
                    "1/6",
                    "They are equal",
                    "Cannot compare"
                  ],
                  "correctIndex": 0,
                  "explanation": "Cutting a whole into 3 parts gives larger pieces than cutting it into 6 parts."
                },
                "visualType": "fraction_galaxy",
                "caption": "Comparing fraction bar lengths."
              }
            ],
            "takeaways": [
              "A **unit fraction** ($\\frac{1}{b}$) represents exactly 1 part when a whole is divided into $b$ equal parts.",
              "The fraction $\\frac{a}{b}$ is built by combining $a$ copies of $\\frac{1}{b}$.",
              "When two fractions have the **same numerator**, the one with the **smaller denominator** is larger (e.g., $\\frac{1}{3} > \\frac{1}{6}$)."
            ],
            "quiz": {
              "topic": "Unit Fractions & Fractions on a Number Line",
              "questions": [
                {
                  "question": "What does the denominator 8 in $\\frac{3}{8}$ tell us?",
                  "options": [
                    "The whole is divided into 8 equal parts",
                    "3 parts are unshaded",
                    "There are 8 wholes",
                    "Each part equals 8"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "The denominator tells how many equal parts make 1 whole."
                },
                {
                  "question": "Which fraction is located at the exact halfway point between 0 and 1?",
                  "options": [
                    "$\\frac{2}{4}$",
                    "$\\frac{1}{4}$",
                    "$\\frac{3}{4}$",
                    "$\\frac{4}{4}$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$\\frac{2}{4}$ is equivalent to $\\frac{1}{2}$."
                },
                {
                  "question": "Which comparison is true?",
                  "options": [
                    "$\\frac{2}{3} > \\frac{2}{8}$",
                    "$\\frac{2}{8} > \\frac{2}{3}$",
                    "$\\frac{1}{5} > \\frac{1}{2}$",
                    "$\\frac{3}{6} > \\frac{5}{6}$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "Thirds are larger pieces than eighths, so 2 thirds > 2 eighths."
                }
              ]
            },
            "xpReward": 135,
            "gameId": "game-fraction-blaster"
          }
        ]
      },
      {
        "id": "g3-area-perimeter",
        "grade": 3,
        "stage": "elementary",
        "title": "Area of Rectangles & Perimeter of Polygons",
        "domain": "Geometric & Spatial Reasoning (GSR)",
        "standardCode": "3.GSR.7",
        "description": "Measure area by counting unit squares and multiplying length times width; calculate perimeter by adding all side lengths.",
        "icon": "📐",
        "xpReward": 135,
        "lessons": [
          {
            "id": "g3-l3-area-perim",
            "topicId": "g3-area-perimeter",
            "grade": 3,
            "title": "Area ($A = l \\times w$) vs. Perimeter of Polygons",
            "standard": {
              "code": "3.GSR.7.1",
              "domain": "Geometric & Spatial Reasoning (GSR)",
              "description": "Find the area of rectangles by tiling and multiplying side lengths, and distinguish area from perimeter.",
              "grade": 3
            },
            "objectives": [
              "Calculate area of a rectangle as the number of unit squares covering the inside ($A = l \\times w$).",
              "Calculate perimeter as the total distance around the outside boundary.",
              "Design rectangles with the same area but different perimeters (and vice versa)."
            ],
            "scenes": [
              {
                "id": "g3-l3-area-perim-s1",
                "title": "Step 1: Area as Covering with Unit Squares ($A = l \\times w$)",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "Area measures how many 1-by-1 unit squares fit inside a flat surface. A rectangle 6 units long and 4 units wide holds 6 times 4 equals 24 square units!",
                "explanation": "Tiling a rectangle with rows of unit squares forms an array, so we multiply **Length $\\times$ Width**.",
                "formula": "$$\\text{Area} = \\text{length} \\times \\text{width} = l \\times w$$",
                "workedExample": {
                  "problem": "Find the area of a solar panel that is 8 meters long and 3 meters wide.",
                  "steps": [
                    "Identify length $l = 8\\text{ m}$ and width $w = 3\\text{ m}$.",
                    "Multiply: $A = 8 \\times 3 = 24\\text{ square meters}$."
                  ],
                  "answer": "24 square meters (24 m²)"
                },
                "quickCheck": {
                  "question": "A rectangle has an area of 35 square inches and a width of 5 inches. What is its length?",
                  "options": [
                    "7 inches",
                    "30 inches",
                    "40 inches",
                    "6 inches"
                  ],
                  "correctIndex": 0,
                  "explanation": "Since 7 × 5 = 35, the length is 7 inches."
                },
                "visualType": "geometry_shapes",
                "caption": "Grid of unit squares inside a rectangle."
              },
              {
                "id": "g3-l3-area-perim-s2",
                "title": "Step 2: Perimeter as Distance Around the Outside",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "If you walk all the way around the outside fence of a rectangular garden, the total distance you walk is the perimeter!",
                "explanation": "Remember that opposite sides of a rectangle are **equal**! A rectangle with length $8$ and width $3$ has four sides: $8, 3, 8, 3$.",
                "formula": "$$\\text{Perimeter} = l + w + l + w = 2l + 2w$$",
                "workedExample": {
                  "problem": "Find the perimeter of a rectangle with length 8 m and width 3 m.",
                  "steps": [
                    "Write all four side lengths: $8\\text{ m}, 3\\text{ m}, 8\\text{ m}, 3\\text{ m}$.",
                    "Add them all together: $8 + 3 + 8 + 3 = 22\\text{ m}$."
                  ],
                  "answer": "22 meters"
                },
                "quickCheck": {
                  "question": "A square has a side length of 6 cm. What is its perimeter?",
                  "options": [
                    "24 cm",
                    "36 cm",
                    "12 cm",
                    "18 cm"
                  ],
                  "correctIndex": 0,
                  "explanation": "A square has 4 equal sides: 6 + 6 + 6 + 6 = 24 cm."
                },
                "visualType": "geometry_shapes",
                "caption": "Adding boundary side lengths to find perimeter."
              },
              {
                "id": "g3-l3-area-perim-s3",
                "title": "Step 3: Same Area, Different Perimeter!",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "Two rectangles can have the exact same area of 12 square units—like 3 by 4 and 2 by 6—but have completely different perimeters!",
                "explanation": "- A $3 \\times 4$ rectangle has $\\text{Area} = 12$ and $\\text{Perimeter} = 3+4+3+4 = 14$.\n- A $2 \\times 6$ rectangle has $\\text{Area} = 12$ and $\\text{Perimeter} = 2+6+2+6 = 16$.",
                "formula": "$$3 \\times 4 = 12 \\text{ (Perim } 14\\text{)} \\quad \\text{vs.} \\quad 2 \\times 6 = 12 \\text{ (Perim } 16\\text{)}$$",
                "workedExample": {
                  "problem": "Compare the area and perimeter of a $1 \\times 12$ rectangle and a $3 \\times 4$ rectangle.",
                  "steps": [
                    "Both have Area $= 12$ square units.",
                    "Perimeter of $1 \\times 12$: $1 + 12 + 1 + 12 = 26$ units.",
                    "Perimeter of $3 \\times 4$: $3 + 4 + 3 + 4 = 14$ units."
                  ],
                  "answer": "Same area (12), different perimeters (26 vs. 14)"
                },
                "quickCheck": {
                  "question": "Which units are used to measure AREA?",
                  "options": [
                    "Square units (e.g., sq ft)",
                    "Linear units (e.g., ft)",
                    "Minutes",
                    "Gallons"
                  ],
                  "correctIndex": 0,
                  "explanation": "Area counts 2D unit squares, so it is always measured in square units."
                },
                "visualType": "geometry_shapes",
                "caption": "Comparing interior area vs. boundary perimeter."
              }
            ],
            "takeaways": [
              "**Area** is the 2D space *inside* a shape, measured in **square units** ($\\text{sq cm}, \\text{in}^2$).",
              "**Perimeter** is the total length *around* the outside edges, measured in **linear units** ($\\text{cm}, \\text{in}$).",
              "For a rectangle: $\\text{Area} = l \\times w$ and $\\text{Perimeter} = l + w + l + w$."
            ],
            "quiz": {
              "topic": "Area of Rectangles & Perimeter of Polygons",
              "questions": [
                {
                  "question": "What is the area of a rectangle with length 9 ft and width 4 ft?",
                  "options": [
                    "36 sq ft",
                    "26 ft",
                    "13 sq ft",
                    "18 sq ft"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$9 \\times 4 = 36$ square feet."
                },
                {
                  "question": "What is the perimeter of a rectangle with length 9 ft and width 4 ft?",
                  "options": [
                    "26 ft",
                    "36 ft",
                    "13 ft",
                    "22 ft"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$9 + 4 + 9 + 4 = 26$ feet."
                },
                {
                  "question": "A triangle has sides of 5 cm, 6 cm, and 7 cm. What is its perimeter?",
                  "options": [
                    "18 cm",
                    "30 cm",
                    "11 cm",
                    "210 cm"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$5 + 6 + 7 = 18\\text{ cm}$."
                }
              ]
            },
            "xpReward": 135
          }
        ]
      },
      {
        "id": "g3-time-volume-graphs",
        "grade": 3,
        "stage": "elementary",
        "title": "Elapsed Time, Liquid Volume, Mass & Scaled Graphs",
        "domain": "Measurement & Data Reasoning (MDR)",
        "standardCode": "3.MDR.5",
        "description": "Tell time to the nearest minute, find elapsed time, measure grams/kilograms/liters, and read scaled bar and picture graphs.",
        "icon": "📊",
        "xpReward": 135,
        "lessons": [
          {
            "id": "g3-l4-elapsed-time-graphs",
            "topicId": "g3-time-volume-graphs",
            "grade": 3,
            "title": "Elapsed Time & Scaled Bar Graphs",
            "standard": {
              "code": "3.MDR.5.1",
              "domain": "Measurement & Data Reasoning (MDR)",
              "description": "Solve elapsed time word problems on a number line and interpret scaled bar graphs and picture graphs.",
              "grade": 3
            },
            "objectives": [
              "Tell time to the nearest minute and compute elapsed time using number line jumps.",
              "Estimate and measure liquid volume in liters (L) and mass in grams (g) and kilograms (kg).",
              "Read scaled bar graphs where each grid line represents 2, 5, or 10 units."
            ],
            "scenes": [
              {
                "id": "g3-l4-elapsed-time-graphs-s1",
                "title": "Step 1: Elapsed Time on a Timeline",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "If a spacewalk starts at 2:15 PM and lasts 40 minutes, jump 40 minutes forward on the timeline: 15 plus 40 is 55, so it ends at 2:55 PM!",
                "explanation": "**Elapsed time** is how much time passes from start to finish. When crossing an hour (like $1:40$ to $2:10$), jump to $2:00$ first ($+20$ min), then jump to $2:10$ ($+10$ min) for $30$ minutes total.",
                "formula": "$$\\text{End Time} = \\text{Start Time} + \\text{Elapsed Time}$$",
                "workedExample": {
                  "problem": "A science lab starts at 10:45 AM and ends at 11:20 AM. How long did the lab last?",
                  "steps": [
                    "Jump from 10:45 AM to 11:00 AM: $+15$ minutes.",
                    "Jump from 11:00 AM to 11:20 AM: $+20$ minutes.",
                    "Add the jumps: $15 + 20 = 35$ minutes."
                  ],
                  "answer": "35 minutes"
                },
                "quickCheck": {
                  "question": "A movie starts at 3:10 PM and is 45 minutes long. When does it end?",
                  "options": [
                    "3:55 PM",
                    "3:45 PM",
                    "4:05 PM",
                    "3:50 PM"
                  ],
                  "correctIndex": 0,
                  "explanation": "10 minutes + 45 minutes = 55 minutes, so 3:55 PM."
                },
                "visualType": "number_line",
                "caption": "Jumping across hours on an elapsed-time number line."
              },
              {
                "id": "g3-l4-elapsed-time-graphs-s2",
                "title": "Step 2: Mass (g, kg) and Liquid Volume (mL, L)",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "A single raisin or paperclip weighs about 1 gram, while a textbook weighs about 1 kilogram (1,000 grams)!",
                "explanation": "- **Mass** measures how much matter is in an object: **grams (g)** for light items, **kilograms (kg)** for heavier items.\n- **Liquid Volume** measures capacity: **milliliters (mL)** and **liters (L)**.",
                "formula": "$$1\\text{ kg} = 1,000\\text{ g}, \\quad 1\\text{ L} = 1,000\\text{ mL}$$",
                "workedExample": {
                  "problem": "Three identical toolboxes have a total mass of 24 kg. What is the mass of 1 toolbox?",
                  "steps": [
                    "Divide total mass by number of boxes: $24 \\div 3$.",
                    "Since $3 \\times 8 = 24$, each toolbox is $8\\text{ kg}$."
                  ],
                  "answer": "8 kg"
                },
                "quickCheck": {
                  "question": "Which unit is best for measuring the mass of a bicycle?",
                  "options": [
                    "Kilograms (kg)",
                    "Grams (g)",
                    "Liters (L)",
                    "Inches (in)"
                  ],
                  "correctIndex": 0,
                  "explanation": "Kilograms measure the mass of medium-to-heavy objects."
                },
                "visualType": "fraction_galaxy",
                "caption": "Comparing metric units of mass and volume."
              },
              {
                "id": "g3-l4-elapsed-time-graphs-s3",
                "title": "Step 3: Scaled Bar Graphs & Picture Graphs",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "In a scaled picture graph where each star symbol stands for 5 missions, 4 stars represent 4 times 5 equals 20 missions!",
                "explanation": "Multiply the number of symbols by the **key value**, or read where the top of the bar lands on the scaled axis.",
                "formula": "$$\\text{Category Value} = (\\text{Number of Symbols}) \\times (\\text{Key Scale})$$",
                "workedExample": {
                  "problem": "On a scaled bar graph counting by 4s, Team A's bar reaches 28 and Team B's bar reaches 16. How many more points did Team A score?",
                  "steps": [
                    "Read Team A: $28$.",
                    "Read Team B: $16$.",
                    "Subtract: $28 - 16 = 12$ points."
                  ],
                  "answer": "12 points"
                },
                "quickCheck": {
                  "question": "If 1 rocket icon = 10 launches, how many launches do $3\\frac{1}{2}$ rocket icons represent?",
                  "options": [
                    "35 launches",
                    "30 launches",
                    "40 launches",
                    "13 launches"
                  ],
                  "correctIndex": 0,
                  "explanation": "3 full icons = 30, plus half of 10 = 5, giving 35."
                },
                "visualType": "fraction_galaxy",
                "caption": "Interpreting scaled bars and keys."
              }
            ],
            "takeaways": [
              "On an open timeline, jump to the next whole hour first to find **elapsed time** easily.",
              "$1\\text{ kilogram (kg)} = 1,000\\text{ grams (g)}$; a paperclip has a mass of about $1\\text{ gram}$.",
              "Always check the **scale** (key) of a bar or picture graph before reading values."
            ],
            "quiz": {
              "topic": "Elapsed Time, Liquid Volume, Mass & Scaled Graphs",
              "questions": [
                {
                  "question": "A shuttle launches at 1:25 PM and lands at 1:55 PM. How many minutes was the flight?",
                  "options": [
                    "30 minutes",
                    "25 minutes",
                    "35 minutes",
                    "40 minutes"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$55 - 25 = 30$ minutes."
                },
                {
                  "question": "In a picture graph, each planet symbol represents 6 moons. How many moons do 4 symbols represent?",
                  "options": [
                    "24 moons",
                    "10 moons",
                    "18 moons",
                    "30 moons"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$4 \\times 6 = 24$ moons."
                },
                {
                  "question": "A container holds 18 liters of water. If it is poured equally into 3 jugs, how many liters are in each jug?",
                  "options": [
                    "6 liters",
                    "15 liters",
                    "21 liters",
                    "9 liters"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$18 \\div 3 = 6$ liters."
                }
              ]
            },
            "xpReward": 135
          }
        ]
      }
    ]
  },
  {
    "grade": 4,
    "gradeName": "Grade 4 — Fraction Equivalence, Multi-Digit Operations & Angles",
    "stage": "elementary",
    "description": "Fraction equivalence & operations, multi-digit multiplication & division, decimals to hundredths, and geometric angles.",
    "topics": [
      {
        "id": "g4-fractions",
        "grade": 4,
        "stage": "elementary",
        "title": "Fraction Equivalence & Operations",
        "domain": "Numerical Reasoning (NR)",
        "standardCode": "4.NR.4",
        "description": "Understand fraction equivalence, compare fractions with unlike denominators, and add/subtract like fractions.",
        "icon": "🍰",
        "xpReward": 150,
        "lessons": [
          {
            "id": "g4-l1-equiv-fractions",
            "topicId": "g4-fractions",
            "grade": 4,
            "title": "Visual Equivalent Fractions & Like-Denominator Operations",
            "standard": {
              "code": "4.NR.4.1",
              "domain": "Numerical Reasoning (NR)",
              "description": "Explain why a/b is equivalent to (n*a)/(n*b) using visual fraction models and add/subtract like fractions.",
              "grade": 4
            },
            "objectives": [
              "Demonstrate why $1/2 = 2/4 = 4/8$ using area models.",
              "Generate equivalent fractions by multiplying top and bottom by $n$.",
              "Add and subtract fractions and mixed numbers with like denominators."
            ],
            "scenes": [
              {
                "id": "g4-l1-equiv-fractions-s1",
                "title": "Step 1: Generating Equivalent Fractions",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "1 out of 2, 2 out of 4, and 4 out of 8 all fill 50% of the tank!",
                "explanation": "Multiplying numerator and denominator by the same nonzero number $n$ multiplies by $\\frac{n}{n}=1$.",
                "formula": "$$\\frac{a}{b} = \\frac{a \\times n}{b \\times n}$$",
                "workedExample": {
                  "problem": "Find an equivalent fraction to $\\frac{3}{4}$ with denominator $8$.",
                  "steps": [
                    "Multiply top and bottom by $2$: $\\frac{3 \\times 2}{4 \\times 2} = \\frac{6}{8}$."
                  ],
                  "answer": "6/8"
                },
                "quickCheck": {
                  "question": "Which fraction is equivalent to $\\frac{2}{5}$?",
                  "options": [
                    "4/10",
                    "4/5",
                    "2/10",
                    "5/2"
                  ],
                  "correctIndex": 0,
                  "explanation": "Multiply numerator and denominator by 2 to get 4/10."
                },
                "visualType": "fraction_galaxy",
                "caption": "Comparing 1/2, 2/4, and 4/8."
              },
              {
                "id": "g4-l1-equiv-fractions-s2",
                "title": "Step 2: Adding & Subtracting Like Fractions",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "When denominators match, the slices are the same size—just add or subtract numerators!",
                "explanation": "Keep the denominator unchanged and combine the numerators.",
                "formula": "$$\\frac{a}{d} + \\frac{b}{d} = \\frac{a+b}{d}$$",
                "workedExample": {
                  "problem": "Compute $\\frac{5}{8} + \\frac{2}{8}$.",
                  "steps": [
                    "Add numerators: $5+2=7$.",
                    "Keep denominator $8$ to get $\\frac{7}{8}$."
                  ],
                  "answer": "7/8"
                },
                "quickCheck": {
                  "question": "What is $\\frac{7}{10} - \\frac{3}{10}$?",
                  "options": [
                    "4/10",
                    "4/0",
                    "10/10",
                    "4/20"
                  ],
                  "correctIndex": 0,
                  "explanation": "Subtract numerators 7 - 3 = 4 and keep denominator 10."
                },
                "visualType": "fraction_galaxy",
                "caption": "Adding like fraction bars."
              },
              {
                "id": "g4-l1-equiv-fractions-s3",
                "title": "Step 3: Mixed Numbers & Improper Fractions",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "7/4 is more than 1 whole because 4/4 makes 1 whole and 3/4 is left over!",
                "explanation": "Divide the numerator by the denominator to convert an improper fraction into a mixed number.",
                "formula": "$$\\frac{7}{4} = \\frac{4}{4} + \\frac{3}{4} = 1\\frac{3}{4}$$",
                "workedExample": {
                  "problem": "Convert $2\\frac{1}{3}$ to an improper fraction.",
                  "steps": [
                    "$2$ wholes $= \\frac{6}{3}$.",
                    "Add $\\frac{1}{3}$ to get $\\frac{7}{3}$."
                  ],
                  "answer": "7/3"
                },
                "quickCheck": {
                  "question": "What is $\\frac{9}{4}$ as a mixed number?",
                  "options": [
                    "2 1/4",
                    "1 5/4",
                    "2 3/4",
                    "3 1/4"
                  ],
                  "correctIndex": 0,
                  "explanation": "9 ÷ 4 = 2 with remainder 1, so 2 1/4."
                },
                "visualType": "fraction_galaxy",
                "caption": "Converting improper fractions and mixed numbers."
              }
            ],
            "takeaways": [
              "Multiplying numerator and denominator by $n$ keeps value equal.",
              "Add numerators and keep the common denominator: $\\frac{a}{d}+\\frac{b}{d}=\\frac{a+b}{d}$.",
              "An improper fraction $\\frac{7}{4}$ equals $1\\frac{3}{4}$."
            ],
            "quiz": {
              "topic": "Fraction Equivalence & Operations",
              "questions": [
                {
                  "question": "Which fraction is equivalent to $\\frac{3}{4}$?",
                  "options": [
                    "$\\frac{6}{8}$",
                    "$\\frac{5}{6}$",
                    "$\\frac{4}{3}$",
                    "$\\frac{6}{7}$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$\\frac{3\\times 2}{4\\times 2}=\\frac{6}{8}$."
                },
                {
                  "question": "What is $\\frac{2}{5} + \\frac{1}{5}$?",
                  "options": [
                    "$\\frac{3}{5}$",
                    "$\\frac{3}{10}$",
                    "$\\frac{2}{10}$",
                    "$\\frac{1}{5}$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "Add numerators: $2+1=3$."
                },
                {
                  "question": "Convert $\\frac{7}{4}$ into a mixed number.",
                  "options": [
                    "$1\\frac{3}{4}$",
                    "$1\\frac{1}{4}$",
                    "$2\\frac{1}{4}$",
                    "$1\\frac{7}{4}$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$7 \\div 4 = 1$ R $3$."
                }
              ]
            },
            "xpReward": 150,
            "gameId": "game-fraction-blaster"
          }
        ]
      },
      {
        "id": "g4-multi-digit-ops",
        "grade": 4,
        "stage": "elementary",
        "title": "Multi-Digit Multiplication & Division",
        "domain": "Numerical Reasoning (NR)",
        "standardCode": "4.NR.2",
        "description": "Multiply up to 4-digit by 1-digit and 2-digit by 2-digit numbers using area models, and divide with remainders.",
        "icon": "✖️",
        "xpReward": 150,
        "lessons": [
          {
            "id": "g4-l2-area-mult",
            "topicId": "g4-multi-digit-ops",
            "grade": 4,
            "title": "Area Models, Partial Products & Division",
            "standard": {
              "code": "4.NR.2.1",
              "domain": "Numerical Reasoning (NR)",
              "description": "Multiply multi-digit whole numbers and find whole-number quotients and remainders using place value strategies.",
              "grade": 4
            },
            "objectives": [
              "Use area models and partial products to multiply multi-digit numbers.",
              "Multiply two 2-digit numbers using a 4-box place value grid.",
              "Divide by 1-digit divisors using partial quotients and interpret remainders."
            ],
            "scenes": [
              {
                "id": "g4-l2-area-mult-s1",
                "title": "Step 1: Place Value Area Models",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "Split 36 into 30 + 6, multiply each by 4, and add 120 + 24 = 144!",
                "explanation": "Partial products multiply each digit's place value separately.",
                "formula": "$$(30 + 6) \\times 4 = 120 + 24 = 144$$",
                "workedExample": {
                  "problem": "Compute $245 \\times 3$.",
                  "steps": [
                    "$200 \\times 3 = 600$, $40 \\times 3 = 120$, $5 \\times 3 = 15$.",
                    "Add: $600 + 120 + 15 = 735$."
                  ],
                  "answer": "735"
                },
                "quickCheck": {
                  "question": "What is $47 \\times 5$?",
                  "options": [
                    "235",
                    "205",
                    "245",
                    "215"
                  ],
                  "correctIndex": 0,
                  "explanation": "200 + 35 = 235."
                },
                "visualType": "geometry_shapes",
                "caption": "Area model for partial products."
              },
              {
                "id": "g4-l2-area-mult-s2",
                "title": "Step 2: 2-Digit by 2-Digit Multiplication",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "For 23 × 14, split into (20 + 3)(10 + 4) to get four partial products!",
                "explanation": "Multiply tens by tens, tens by ones, ones by tens, and ones by ones.",
                "formula": "$$(20+3)(10+4) = 200 + 80 + 30 + 12 = 322$$",
                "workedExample": {
                  "problem": "Multiply $15 \\times 13$.",
                  "steps": [
                    "$10\\times 10=100$, $10\\times 3=30$, $5\\times 10=50$, $5\\times 3=15$.",
                    "Sum: $100+30+50+15 = 195$."
                  ],
                  "answer": "195"
                },
                "quickCheck": {
                  "question": "What is $20 \\times 30$?",
                  "options": [
                    "600",
                    "60",
                    "500",
                    "6,000"
                  ],
                  "correctIndex": 0,
                  "explanation": "2 tens × 3 tens = 600."
                },
                "visualType": "geometry_shapes",
                "caption": "4-box area model."
              },
              {
                "id": "g4-l2-area-mult-s3",
                "title": "Step 3: Division & Interpreting Remainders",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "When 26 astronauts board 4-person pods, 6 pods hold 24 and 2 astronauts remain!",
                "explanation": "Use partial quotients to subtract easy multiples of the divisor.",
                "formula": "$$26 \\div 4 = 6\\text{ R }2$$",
                "workedExample": {
                  "problem": "Divide $98 \\div 4$.",
                  "steps": [
                    "$4 \\times 20 = 80$ ($18$ left).",
                    "$4 \\times 4 = 16$ ($2$ left). Quotient $= 24\\text{ R }2$."
                  ],
                  "answer": "24 R 2"
                },
                "quickCheck": {
                  "question": "What is $31 \\div 6$?",
                  "options": [
                    "5 R 1",
                    "5 R 5",
                    "6 R 1",
                    "4 R 7"
                  ],
                  "correctIndex": 0,
                  "explanation": "6 × 5 = 30 with remainder 1."
                },
                "visualType": "number_line",
                "caption": "Division as repeated subtraction."
              }
            ],
            "takeaways": [
              "Decompose factors by place value: $36 \\times 4 = (30 \\times 4) + (6 \\times 4)$.",
              "In division, $\\text{Dividend} = (\\text{Divisor} \\times \\text{Quotient}) + \\text{Remainder}$.",
              "The remainder is always less than the divisor."
            ],
            "quiz": {
              "topic": "Multi-Digit Multiplication & Division",
              "questions": [
                {
                  "question": "What is $34 \\times 6$?",
                  "options": [
                    "204",
                    "184",
                    "240",
                    "194"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$180 + 24 = 204$."
                },
                {
                  "question": "What is $12 \\times 15$?",
                  "options": [
                    "180",
                    "150",
                    "170",
                    "160"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$120 + 60 = 180$."
                },
                {
                  "question": "What is $53 \\div 5$?",
                  "options": [
                    "10 R 3",
                    "10 R 5",
                    "11 R 2",
                    "9 R 8"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$5 \\times 10 + 3 = 53$."
                }
              ]
            },
            "xpReward": 150
          }
        ]
      },
      {
        "id": "g4-decimals",
        "grade": 4,
        "stage": "elementary",
        "title": "Decimals: Tenths & Hundredths",
        "domain": "Numerical Reasoning (NR)",
        "standardCode": "4.NR.5",
        "description": "Write fractions with denominators 10 and 100 as decimals, add tenths and hundredths, and compare decimals.",
        "icon": "🔟",
        "xpReward": 150,
        "lessons": [
          {
            "id": "g4-l3-decimals-intro",
            "topicId": "g4-decimals",
            "grade": 4,
            "title": "Tenths, Hundredths & Decimal Comparisons",
            "standard": {
              "code": "4.NR.5.1",
              "domain": "Numerical Reasoning (NR)",
              "description": "Express fractions with denominators 10 and 100 as decimals and compare decimal quantities.",
              "grade": 4
            },
            "objectives": [
              "Convert $\\frac{3}{10} = 0.3$ and $\\frac{47}{100} = 0.47$.",
              "Add tenths and hundredths by converting tenths to hundredths.",
              "Compare two decimals to the hundredths place."
            ],
            "scenes": [
              {
                "id": "g4-l3-decimals-intro-s1",
                "title": "Step 1: Tenths and Hundredths as Decimals",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "One column of a 100-grid is 1/10 (0.1) or 10/100 (0.10)!",
                "explanation": "The first place after the decimal point is tenths; the second is hundredths.",
                "formula": "$$0.1 = \\frac{1}{10} = \\frac{10}{100} = 0.10$$",
                "workedExample": {
                  "problem": "Write $\\frac{7}{100}$ as a decimal.",
                  "steps": [
                    "Put $0$ in the tenths place and $7$ in the hundredths place: $0.07$."
                  ],
                  "answer": "0.07"
                },
                "quickCheck": {
                  "question": "How is $\\frac{38}{100}$ written as a decimal?",
                  "options": [
                    "0.38",
                    "3.8",
                    "0.038",
                    "38.0"
                  ],
                  "correctIndex": 0,
                  "explanation": "38 hundredths is 0.38."
                },
                "visualType": "fraction_galaxy",
                "caption": "Tenths and hundredths grid."
              },
              {
                "id": "g4-l3-decimals-intro-s2",
                "title": "Step 2: Adding Tenths and Hundredths",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "Rewrite 4/10 as 40/100 before adding 25/100 to get 65/100!",
                "explanation": "Multiply numerator and denominator of the tenths fraction by 10.",
                "formula": "$$\\frac{4}{10} + \\frac{25}{100} = \\frac{40}{100} + \\frac{25}{100} = \\frac{65}{100}$$",
                "workedExample": {
                  "problem": "Find $\\frac{7}{10} + \\frac{9}{100}$.",
                  "steps": [
                    "$\\frac{7}{10} = \\frac{70}{100}$.",
                    "$\\frac{70}{100} + \\frac{9}{100} = \\frac{79}{100}$."
                  ],
                  "answer": "79/100 (0.79)"
                },
                "quickCheck": {
                  "question": "What is $\\frac{5}{10} + \\frac{18}{100}$?",
                  "options": [
                    "68/100",
                    "23/100",
                    "23/110",
                    "518/100"
                  ],
                  "correctIndex": 0,
                  "explanation": "50/100 + 18/100 = 68/100."
                },
                "visualType": "fraction_galaxy",
                "caption": "Adding tenths and hundredths."
              },
              {
                "id": "g4-l3-decimals-intro-s3",
                "title": "Step 3: Comparing Decimals",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "0.4 is greater than 0.38 because 0.4 equals 0.40 (40 hundredths)!",
                "explanation": "Annex a zero to compare hundredths directly.",
                "formula": "$$0.4 = 0.40 > 0.38$$",
                "workedExample": {
                  "problem": "Compare $0.7$ and $0.69$.",
                  "steps": [
                    "Write $0.7$ as $0.70$.",
                    "$70\\text{ hundredths} > 69\\text{ hundredths}$, so $0.7 > 0.69$."
                  ],
                  "answer": "0.7 > 0.69"
                },
                "quickCheck": {
                  "question": "Which is TRUE?",
                  "options": [
                    "0.5 > 0.49",
                    "0.49 > 0.5",
                    "0.08 > 0.8",
                    "0.3 = 0.03"
                  ],
                  "correctIndex": 0,
                  "explanation": "0.50 > 0.49."
                },
                "visualType": "number_line",
                "caption": "Decimals on a number line."
              }
            ],
            "takeaways": [
              "$0.1 = \\frac{1}{10} = \\frac{10}{100} = 0.10$.",
              "To add $\\frac{4}{10} + \\frac{25}{100}$, rewrite $\\frac{4}{10}$ as $\\frac{40}{100}$.",
              "Compare decimals from left to right: ones, then tenths, then hundredths."
            ],
            "quiz": {
              "topic": "Decimals: Tenths & Hundredths",
              "questions": [
                {
                  "question": "Which decimal equals $\\frac{9}{100}$?",
                  "options": [
                    "0.09",
                    "0.9",
                    "9.0",
                    "0.90"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "9 hundredths is 0.09."
                },
                {
                  "question": "What is $\\frac{3}{10} + \\frac{42}{100}$?",
                  "options": [
                    "$\\frac{72}{100}$",
                    "$\\frac{45}{100}$",
                    "$\\frac{45}{110}$",
                    "$\\frac{342}{100}$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$\\frac{30}{100}+\\frac{42}{100}=\\frac{72}{100}$."
                },
                {
                  "question": "Which decimal is greatest: $0.6, 0.58, 0.09, 0.59$?",
                  "options": [
                    "0.6",
                    "0.59",
                    "0.58",
                    "0.09"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$0.6 = 0.60$."
                }
              ]
            },
            "xpReward": 150
          }
        ]
      },
      {
        "id": "g4-angles-geometry",
        "grade": 4,
        "stage": "elementary",
        "title": "Angles, Protractors, Lines & Symmetry",
        "domain": "Geometric & Spatial Reasoning (GSR)",
        "standardCode": "4.GSR.8",
        "description": "Classify acute, right, obtuse, and straight angles, solve additive angle problems, and identify parallel/perpendicular lines.",
        "icon": "📐",
        "xpReward": 150,
        "lessons": [
          {
            "id": "g4-l4-angles-lines",
            "topicId": "g4-angles-geometry",
            "grade": 4,
            "title": "Angle Measures, Protractors & Geometric Lines",
            "standard": {
              "code": "4.GSR.8.1",
              "domain": "Geometric & Spatial Reasoning (GSR)",
              "description": "Measure angles in degrees and solve unknown angle addition and subtraction problems.",
              "grade": 4
            },
            "objectives": [
              "Understand $1^\\circ$ as $\\frac{1}{360}$ of a circle.",
              "Classify acute ($<90^\\circ$), right ($90^\\circ$), obtuse ($>90^\\circ$), and straight ($180^\\circ$) angles.",
              "Find unknown angles using additive angle relationships."
            ],
            "scenes": [
              {
                "id": "g4-l4-angles-lines-s1",
                "title": "Step 1: Degrees & Classifying Angles",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "A full circle is 360°, a straight line is 180°, and a square corner is a 90° right angle!",
                "explanation": "Acute is $<90^\\circ$, Right is $90^\\circ$, Obtuse is between $90^\\circ$ and $180^\\circ$.",
                "formula": "$$\\text{Acute} < 90^\\circ = \\text{Right} < \\text{Obtuse} < 180^\\circ$$",
                "workedExample": {
                  "problem": "Classify a $125^\\circ$ angle.",
                  "steps": [
                    "Since $90^\\circ < 125^\\circ < 180^\\circ$, it is obtuse."
                  ],
                  "answer": "Obtuse"
                },
                "quickCheck": {
                  "question": "What type of angle measures $42^\\circ$?",
                  "options": [
                    "Acute",
                    "Right",
                    "Obtuse",
                    "Straight"
                  ],
                  "correctIndex": 0,
                  "explanation": "42° < 90°, so it is acute."
                },
                "visualType": "geometry_shapes",
                "caption": "Angle classifications."
              },
              {
                "id": "g4-l4-angles-lines-s2",
                "title": "Step 2: Additive Angle Measures",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "If a 90° right angle is split into 35° and x°, then x = 90° - 35° = 55°!",
                "explanation": "Adjacent non-overlapping angles add up to the whole angle.",
                "formula": "$$\\theta_1 + \\theta_2 = \\theta_{\\text{total}}$$",
                "workedExample": {
                  "problem": "Two angles form a $180^\\circ$ line. One is $115^\\circ$. Find the other.",
                  "steps": [
                    "Subtract: $180^\\circ - 115^\\circ = 65^\\circ$."
                  ],
                  "answer": "65°"
                },
                "quickCheck": {
                  "question": "Two angles form a $90^\\circ$ corner. One is $60^\\circ$. What is the other?",
                  "options": [
                    "30°",
                    "120°",
                    "40°",
                    "150°"
                  ],
                  "correctIndex": 0,
                  "explanation": "90° - 60° = 30°."
                },
                "visualType": "geometry_shapes",
                "caption": "Adjacent angle addition."
              },
              {
                "id": "g4-l4-angles-lines-s3",
                "title": "Step 3: Parallel, Perpendicular & Symmetry",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "Perpendicular lines cross at 90°, while parallel lines stay the same distance apart forever!",
                "explanation": "A line of symmetry folds a shape into two matching halves.",
                "formula": "$$AB \\parallel CD \\quad | \\quad AB \\perp CD \\; (90^\\circ)$$",
                "workedExample": {
                  "problem": "How many lines of symmetry does a square have?",
                  "steps": [
                    "2 mid-lines + 2 diagonals = 4 lines of symmetry."
                  ],
                  "answer": "4"
                },
                "quickCheck": {
                  "question": "What angle do perpendicular lines form?",
                  "options": [
                    "90°",
                    "45°",
                    "180°",
                    "0°"
                  ],
                  "correctIndex": 0,
                  "explanation": "Perpendicular lines meet at 90°."
                },
                "visualType": "geometry_shapes",
                "caption": "Lines and symmetry."
              }
            ],
            "takeaways": [
              "Right angle $= 90^\\circ$; Straight line $= 180^\\circ$; Full circle $= 360^\\circ$.",
              "Parallel lines never intersect; perpendicular lines meet at $90^\\circ$.",
              "Adjacent angles add together: $\\theta_{\\text{total}} = \\theta_1 + \\theta_2$."
            ],
            "quiz": {
              "topic": "Angles, Protractors, Lines & Symmetry",
              "questions": [
                {
                  "question": "What fraction of a $360^\\circ$ circle is a $90^\\circ$ right angle?",
                  "options": [
                    "$\\frac{1}{4}$",
                    "$\\frac{1}{2}$",
                    "$\\frac{1}{3}$",
                    "$\\frac{3}{4}$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$90/360 = 1/4$."
                },
                {
                  "question": "An angle measures $138^\\circ$. How is it classified?",
                  "options": [
                    "Obtuse",
                    "Acute",
                    "Right",
                    "Straight"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "Between $90^\\circ$ and $180^\\circ$."
                },
                {
                  "question": "Two angles form a $90^\\circ$ corner. One is $28^\\circ$. Find the other.",
                  "options": [
                    "$62^\\circ$",
                    "$72^\\circ$",
                    "$152^\\circ$",
                    "$52^\\circ$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$90 - 28 = 62^\\circ$."
                }
              ]
            },
            "xpReward": 150
          }
        ]
      }
    ]
  },
  {
    "grade": 5,
    "gradeName": "Grade 5 — Volume, Fraction/Decimal Operations & Coordinate Plane",
    "stage": "elementary",
    "description": "Volume of prisms, adding/multiplying/dividing fractions, decimals to thousandths, and graphing on the coordinate plane.",
    "topics": [
      {
        "id": "g5-decimals-volume",
        "grade": 5,
        "stage": "elementary",
        "title": "Volume of Rectangular Prisms ($V = l \\times w \\times h$)",
        "domain": "Measurement & Data Reasoning (MDR)",
        "standardCode": "5.MDR.7",
        "description": "Understand 3D volume concepts using unit cubes and calculate volume of rectangular and composite prisms.",
        "icon": "📦",
        "xpReward": 160,
        "lessons": [
          {
            "id": "g5-l1-volume",
            "topicId": "g5-decimals-volume",
            "grade": 5,
            "title": "Volume of Right Rectangular Prisms ($V = l \\times w \\times h$)",
            "standard": {
              "code": "5.MDR.7.1",
              "domain": "Measurement & Data Reasoning (MDR)",
              "description": "Calculate volume of right rectangular prisms using unit cubes and formulas V = l * w * h and V = B * h.",
              "grade": 5
            },
            "objectives": [
              "Understand volume as packing 3D space with unit cubes.",
              "Apply $V = l \\times w \\times h$ and $V = B \\times h$.",
              "Find volume of composite 3D figures made of rectangular prisms."
            ],
            "scenes": [
              {
                "id": "g5-l1-volume-s1",
                "title": "Step 1: Packing Unit Cubes & Base Layers",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "Length times width gives the bottom layer of cubes, and height stacks the layers!",
                "explanation": "Multiply base area $B = l \\times w$ by height $h$.",
                "formula": "$$V = B \\times h = l \\times w \\times h$$",
                "workedExample": {
                  "problem": "Find the volume of a prism with $l=5\\text{ m}, w=3\\text{ m}, h=4\\text{ m}$.",
                  "steps": [
                    "Base area $B = 5 \\times 3 = 15\\text{ m}^2$.",
                    "Volume $V = 15 \\times 4 = 60\\text{ m}^3$."
                  ],
                  "answer": "60 m³"
                },
                "quickCheck": {
                  "question": "If $B = 24\\text{ cm}^2$ and $h = 5\\text{ cm}$, what is $V$?",
                  "options": [
                    "120 cm³",
                    "29 cm³",
                    "96 cm³",
                    "100 cm³"
                  ],
                  "correctIndex": 0,
                  "explanation": "24 × 5 = 120 cm³."
                },
                "visualType": "geometry_shapes",
                "caption": "3D rectangular prism layers."
              },
              {
                "id": "g5-l1-volume-s2",
                "title": "Step 2: Finding Missing Dimensions",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "If volume is 48 ft³ and the base is 6 ft by 4 ft (24 ft²), divide 48 by 24 to find height = 2 ft!",
                "explanation": "Divide total volume by the product of the two known dimensions.",
                "formula": "$$h = \\frac{V}{l \\times w}$$",
                "workedExample": {
                  "problem": "A box has $V = 180\\text{ in}^3$, $l = 10\\text{ in}$, $w = 6\\text{ in}$. Find $h$.",
                  "steps": [
                    "Base area $= 10 \\times 6 = 60\\text{ in}^2$.",
                    "$h = 180 \\div 60 = 3\\text{ in}$."
                  ],
                  "answer": "3 in"
                },
                "quickCheck": {
                  "question": "If $V = 40\\text{ ft}^3, l = 5\\text{ ft}, w = 2\\text{ ft}$, what is $h$?",
                  "options": [
                    "4 ft",
                    "8 ft",
                    "20 ft",
                    "30 ft"
                  ],
                  "correctIndex": 0,
                  "explanation": "40 ÷ (5 × 2) = 4 ft."
                },
                "visualType": "geometry_shapes",
                "caption": "Finding unknown prism height."
              },
              {
                "id": "g5-l1-volume-s3",
                "title": "Step 3: Composite 3D Volume",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "Split an L-shaped solid into two non-overlapping rectangular prisms and add their volumes!",
                "explanation": "Volume is additive for non-overlapping 3D parts.",
                "formula": "$$V_{\\text{total}} = V_1 + V_2$$",
                "workedExample": {
                  "problem": "Prism A is $4\\times 3\\times 2\\text{ cm}$ and Prism B is $5\\times 2\\times 3\\text{ cm}$. Find total volume.",
                  "steps": [
                    "$V_A = 24\\text{ cm}^3$ and $V_B = 30\\text{ cm}^3$.",
                    "Total $= 24 + 30 = 54\\text{ cm}^3$."
                  ],
                  "answer": "54 cm³"
                },
                "quickCheck": {
                  "question": "Two cubes each have side $3\\text{ m}$. What is their combined volume?",
                  "options": [
                    "54 m³",
                    "27 m³",
                    "18 m³",
                    "36 m³"
                  ],
                  "correctIndex": 0,
                  "explanation": "27 + 27 = 54 m³."
                },
                "visualType": "geometry_shapes",
                "caption": "Additive volume of composite solids."
              }
            ],
            "takeaways": [
              "Volume is measured in **cubic units** ($\\text{cm}^3, \\text{m}^3$).",
              "$V = \\text{Base Area} \\times \\text{Height} = (l \\times w) \\times h$.",
              "Composite volume is additive: $V_{\\text{total}} = V_1 + V_2$."
            ],
            "quiz": {
              "topic": "Volume of Rectangular Prisms ($V = l \\times w \\times h$)",
              "questions": [
                {
                  "question": "A box has length 4 m, width 3 m, and height 2 m. What is its volume?",
                  "options": [
                    "24 cubic meters",
                    "18 cubic meters",
                    "9 cubic meters",
                    "20 cubic meters"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$4 \\times 3 \\times 2 = 24\\text{ m}^3$."
                },
                {
                  "question": "A prism has base area $15\\text{ in}^2$ and height $6\\text{ in}$. What is its volume?",
                  "options": [
                    "$90\\text{ in}^3$",
                    "$21\\text{ in}^3$",
                    "$75\\text{ in}^3$",
                    "$45\\text{ in}^3$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$15 \\times 6 = 90\\text{ in}^3$."
                },
                {
                  "question": "If a prism has volume $72\\text{ cm}^3$ and base area $9\\text{ cm}^2$, what is its height?",
                  "options": [
                    "8 cm",
                    "9 cm",
                    "63 cm",
                    "6 cm"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$72 \\div 9 = 8\\text{ cm}$."
                }
              ]
            },
            "xpReward": 160
          }
        ]
      },
      {
        "id": "g5-fraction-ops",
        "grade": 5,
        "stage": "elementary",
        "title": "Adding, Multiplying & Dividing Fractions",
        "domain": "Numerical Reasoning (NR)",
        "standardCode": "5.NR.3",
        "description": "Add and subtract fractions with unlike denominators, multiply fractions, and divide with unit fractions.",
        "icon": "➗",
        "xpReward": 165,
        "lessons": [
          {
            "id": "g5-l2-unlike-fractions",
            "topicId": "g5-fraction-ops",
            "grade": 5,
            "title": "Unlike Denominators, Fraction Multiplication & Unit Fraction Division",
            "standard": {
              "code": "5.NR.3.1",
              "domain": "Numerical Reasoning (NR)",
              "description": "Add/subtract unlike fractions using common denominators, multiply fractions, and divide unit fractions and whole numbers.",
              "grade": 5
            },
            "objectives": [
              "Find a common denominator to add and subtract unlike fractions.",
              "Multiply fractions straight across ($\\frac{a}{b}\\times\\frac{c}{d}=\\frac{ac}{bd}$).",
              "Divide whole numbers by unit fractions ($3 \\div \\frac{1}{4} = 12$) and unit fractions by whole numbers."
            ],
            "scenes": [
              {
                "id": "g5-l2-unlike-fractions-s1",
                "title": "Step 1: Adding & Subtracting Unlike Fractions",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "Convert 1/2 and 1/3 to sixths first: 3/6 + 2/6 = 5/6!",
                "explanation": "Find the least common multiple of the denominators.",
                "formula": "$$\\frac{1}{2} + \\frac{1}{3} = \\frac{3}{6} + \\frac{2}{6} = \\frac{5}{6}$$",
                "workedExample": {
                  "problem": "Compute $\\frac{3}{4} - \\frac{1}{3}$.",
                  "steps": [
                    "Common denominator is $12$: $\\frac{9}{12} - \\frac{4}{12} = \\frac{5}{12}$."
                  ],
                  "answer": "5/12"
                },
                "quickCheck": {
                  "question": "What is $\\frac{1}{2} + \\frac{1}{4}$?",
                  "options": [
                    "3/4",
                    "2/6",
                    "2/4",
                    "1/8"
                  ],
                  "correctIndex": 0,
                  "explanation": "2/4 + 1/4 = 3/4."
                },
                "visualType": "fraction_galaxy",
                "caption": "Common denominator fraction bars."
              },
              {
                "id": "g5-l2-unlike-fractions-s2",
                "title": "Step 2: Multiplying Fractions",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "Multiply numerators together and denominators together: (2/3) × (4/5) = 8/15!",
                "explanation": "Taking a fraction of a fraction scales the value.",
                "formula": "$$\\frac{a}{b} \\times \\frac{c}{d} = \\frac{ac}{bd}$$",
                "workedExample": {
                  "problem": "Multiply $\\frac{2}{3} \\times \\frac{4}{5}$.",
                  "steps": [
                    "Top: $2 \\times 4 = 8$. Bottom: $3 \\times 5 = 15$. Result: $\\frac{8}{15}$."
                  ],
                  "answer": "8/15"
                },
                "quickCheck": {
                  "question": "What is $\\frac{3}{4} \\times \\frac{1}{2}$?",
                  "options": [
                    "3/8",
                    "4/6",
                    "3/4",
                    "6/4"
                  ],
                  "correctIndex": 0,
                  "explanation": "(3×1)/(4×2) = 3/8."
                },
                "visualType": "fraction_galaxy",
                "caption": "Area model for multiplying fractions."
              },
              {
                "id": "g5-l2-unlike-fractions-s3",
                "title": "Step 3: Dividing with Unit Fractions",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "How many 1/4s are in 3 wholes? 3 × 4 = 12 fourths!",
                "explanation": "Splitting $n$ wholes into pieces of size $1/b$ creates $n \\times b$ pieces.",
                "formula": "$$n \\div \\frac{1}{b} = n \\times b, \\qquad \\frac{1}{b} \\div n = \\frac{1}{b \\times n}$$",
                "workedExample": {
                  "problem": "Evaluate $4 \\div \\frac{1}{3}$ and $\\frac{1}{3} \\div 4$.",
                  "steps": [
                    "$4 \\div \\frac{1}{3} = 12$; $\\frac{1}{3} \\div 4 = \\frac{1}{12}$."
                  ],
                  "answer": "12 and 1/12"
                },
                "quickCheck": {
                  "question": "What is $5 \\div \\frac{1}{2}$?",
                  "options": [
                    "10",
                    "5/2",
                    "1/10",
                    "2.5"
                  ],
                  "correctIndex": 0,
                  "explanation": "5 × 2 = 10."
                },
                "visualType": "fraction_galaxy",
                "caption": "Dividing wholes by unit fractions."
              }
            ],
            "takeaways": [
              "Unlike fractions require a **common denominator** before adding or subtracting.",
              "Fraction multiplication multiplies numerators and multiplies denominators.",
              "$n \\div \\frac{1}{b} = n \\times b$ and $\\frac{1}{b} \\div n = \\frac{1}{b \\times n}$."
            ],
            "quiz": {
              "topic": "Adding, Multiplying & Dividing Fractions",
              "questions": [
                {
                  "question": "What is $\\frac{2}{3} + \\frac{1}{6}$?",
                  "options": [
                    "$\\frac{5}{6}$",
                    "$\\frac{3}{9}$",
                    "$\\frac{1}{2}$",
                    "$\\frac{3}{6}$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$\\frac{4}{6} + \\frac{1}{6} = \\frac{5}{6}$."
                },
                {
                  "question": "What is $\\frac{1}{2} \\times \\frac{3}{4}$?",
                  "options": [
                    "$\\frac{3}{8}$",
                    "$\\frac{4}{6}$",
                    "$\\frac{3}{6}$",
                    "$\\frac{1}{4}$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$\\frac{1\\times 3}{2\\times 4} = \\frac{3}{8}$."
                },
                {
                  "question": "What is $6 \\div \\frac{1}{3}$?",
                  "options": [
                    "18",
                    "2",
                    "$\\frac{1}{18}$",
                    "9"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$6 \\times 3 = 18$."
                }
              ]
            },
            "xpReward": 165,
            "gameId": "game-fraction-blaster"
          }
        ]
      },
      {
        "id": "g5-decimals-thousandths",
        "grade": 5,
        "stage": "elementary",
        "title": "Decimals to Thousandths & Powers of 10",
        "domain": "Numerical Reasoning (NR)",
        "standardCode": "5.NR.4",
        "description": "Read, write, round, and compute with decimals to the thousandths place and powers of 10 ($10^1, 10^2, 10^3$).",
        "icon": "🔬",
        "xpReward": 165,
        "lessons": [
          {
            "id": "g5-l3-decimals-powers10",
            "topicId": "g5-decimals-thousandths",
            "grade": 5,
            "title": "Powers of 10, Thousandths & Decimal Operations",
            "standard": {
              "code": "5.NR.4.1",
              "domain": "Numerical Reasoning (NR)",
              "description": "Explain patterns in powers of 10 and add, subtract, multiply, and divide decimals.",
              "grade": 5
            },
            "objectives": [
              "Shift decimal points when multiplying or dividing by $10^1, 10^2, 10^3$.",
              "Align decimal points to add and subtract decimals.",
              "Count decimal places when multiplying decimals ($0.4 \\times 0.2 = 0.08$)."
            ],
            "scenes": [
              {
                "id": "g5-l3-decimals-powers10-s1",
                "title": "Step 1: Powers of 10 & Decimal Shifts",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "Multiplying by 10² (100) shifts the decimal point 2 places to the right!",
                "explanation": "Each power of 10 scales a number by a factor of 10.",
                "formula": "$$3.45 \\times 10^2 = 345, \\quad 3.45 \\div 10 = 0.345$$",
                "workedExample": {
                  "problem": "Evaluate $0.62 \\times 10^3$.",
                  "steps": [
                    "Shift the decimal 3 places right: $620$."
                  ],
                  "answer": "620"
                },
                "quickCheck": {
                  "question": "What is $4.8 \\times 10^2$?",
                  "options": [
                    "480",
                    "48",
                    "0.048",
                    "4,800"
                  ],
                  "correctIndex": 0,
                  "explanation": "4.8 × 100 = 480."
                },
                "visualType": "number_line",
                "caption": "Powers of 10 shifts."
              },
              {
                "id": "g5-l3-decimals-powers10-s2",
                "title": "Step 2: Adding & Subtracting Decimals",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "Line up the decimal points and annex zeros so both numbers have the same length!",
                "explanation": "Add or subtract place-by-place from right to left.",
                "formula": "$$12.60 + 3.48 = 16.08$$",
                "workedExample": {
                  "problem": "Compute $8.5 - 2.37$.",
                  "steps": [
                    "Write $8.5$ as $8.50$.",
                    "$8.50 - 2.37 = 6.13$."
                  ],
                  "answer": "6.13"
                },
                "quickCheck": {
                  "question": "What is $4.7 + 1.25$?",
                  "options": [
                    "5.95",
                    "1.72",
                    "5.32",
                    "6.05"
                  ],
                  "correctIndex": 0,
                  "explanation": "4.70 + 1.25 = 5.95."
                },
                "visualType": "number_line",
                "caption": "Decimal place alignment."
              },
              {
                "id": "g5-l3-decimals-powers10-s3",
                "title": "Step 3: Multiplying Decimals",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "0.4 × 0.2 = 0.08 because 4/10 × 2/10 = 8/100!",
                "explanation": "Count the total decimal places in both factors.",
                "formula": "$$0.4 \\times 0.2 = \\frac{4}{10} \\times \\frac{2}{10} = \\frac{8}{100} = 0.08$$",
                "workedExample": {
                  "problem": "Multiply $1.5 \\times 0.3$.",
                  "steps": [
                    "$15 \\times 3 = 45$ with 2 decimal places $\\implies 0.45$."
                  ],
                  "answer": "0.45"
                },
                "quickCheck": {
                  "question": "What is $0.6 \\times 0.5$?",
                  "options": [
                    "0.30 (0.3)",
                    "3.0",
                    "0.03",
                    "0.11"
                  ],
                  "correctIndex": 0,
                  "explanation": "6 × 5 = 30 with 2 decimal places = 0.30."
                },
                "visualType": "fraction_galaxy",
                "caption": "Decimal multiplication grid."
              }
            ],
            "takeaways": [
              "Multiplying by $10^n$ shifts the decimal $n$ places right.",
              "Always line up decimal points when adding or subtracting.",
              "Tenths $\\times$ Tenths $=$ Hundredths ($0.4 \\times 0.2 = 0.08$)."
            ],
            "quiz": {
              "topic": "Decimals to Thousandths & Powers of 10",
              "questions": [
                {
                  "question": "What is $0.4 \\times 0.2$?",
                  "options": [
                    "0.08",
                    "0.8",
                    "0.008",
                    "8.0"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$4/10 \\times 2/10 = 8/100 = 0.08$."
                },
                {
                  "question": "What is $7.25 \\times 10^2$?",
                  "options": [
                    "725",
                    "72.5",
                    "0.0725",
                    "7,250"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "Shift decimal 2 places right."
                },
                {
                  "question": "Evaluate $10.4 - 3.15$.",
                  "options": [
                    "7.25",
                    "7.35",
                    "6.25",
                    "7.11"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$10.40 - 3.15 = 7.25$."
                }
              ]
            },
            "xpReward": 165
          }
        ]
      },
      {
        "id": "g5-coordinate-patterns",
        "grade": 5,
        "stage": "elementary",
        "title": "Coordinate Plane, Order of Operations & Patterns",
        "domain": "Patterning & Algebraic Reasoning (PAR)",
        "standardCode": "5.PAR.6",
        "description": "Evaluate expressions with parentheses, generate two-rule numerical patterns, and plot ordered pairs $(x, y)$ in Quadrant I.",
        "icon": "🗺️",
        "xpReward": 165,
        "lessons": [
          {
            "id": "g5-l4-coords-pemdas",
            "topicId": "g5-coordinate-patterns",
            "grade": 5,
            "title": "Order of Operations & Coordinate Plane Graphing",
            "standard": {
              "code": "5.PAR.6.1",
              "domain": "Patterning & Algebraic Reasoning (PAR)",
              "description": "Evaluate numerical expressions with grouping symbols and plot ordered pairs (x, y) in the first quadrant.",
              "grade": 5
            },
            "objectives": [
              "Apply Order of Operations (Parentheses first).",
              "Plot $(x, y)$ by moving right $x$ units and up $y$ units.",
              "Generate and graph ordered pairs from two numerical rules."
            ],
            "scenes": [
              {
                "id": "g5-l4-coords-pemdas-s1",
                "title": "Step 1: Order of Operations (PEMDAS)",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "Always evaluate inside parentheses first, then multiply or divide, then add or subtract!",
                "explanation": "Grouping symbols override standard operator order.",
                "formula": "$$20 - 3 \\times (4 + 2) = 20 - 3 \\times 6 = 2$$",
                "workedExample": {
                  "problem": "Evaluate $(6 + 4) \\times 3 - 5$.",
                  "steps": [
                    "Parentheses: $6+4=10$.",
                    "Multiply: $10 \\times 3 = 30$. Subtract: $30 - 5 = 25$."
                  ],
                  "answer": "25"
                },
                "quickCheck": {
                  "question": "What is $15 - 2 \\times (3 + 4)$?",
                  "options": [
                    "1",
                    "91",
                    "13",
                    "5"
                  ],
                  "correctIndex": 0,
                  "explanation": "3+4=7, 2×7=14, 15-14=1."
                },
                "visualType": "number_line",
                "caption": "Order of operations hierarchy."
              },
              {
                "id": "g5-l4-coords-pemdas-s2",
                "title": "Step 2: Plotting Ordered Pairs (x, y)",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "Start at the origin (0, 0), move right along x first, then move up along y!",
                "explanation": "Never swap the x and y coordinates.",
                "formula": "$$(x, y) = (\\text{Horizontal Run}, \\text{Vertical Rise})$$",
                "workedExample": {
                  "problem": "Start at $(0,0)$, move 4 right and 0 up. Write the point.",
                  "steps": [
                    "$x = 4, y = 0 \\implies (4, 0)$."
                  ],
                  "answer": "(4, 0)"
                },
                "quickCheck": {
                  "question": "In $(7, 2)$, what does $7$ represent?",
                  "options": [
                    "7 units right along the x-axis",
                    "7 units up along the y-axis",
                    "2 units right",
                    "9 units total"
                  ],
                  "correctIndex": 0,
                  "explanation": "First coordinate is x."
                },
                "visualType": "linear_trajectory",
                "caption": "First-quadrant coordinate plane."
              },
              {
                "id": "g5-l4-coords-pemdas-s3",
                "title": "Step 3: Two-Rule Patterns & Graphing",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "If X adds 2 (0, 2, 4) and Y adds 6 (0, 6, 12), each Y value is 3 times X!",
                "explanation": "Form ordered pairs $(x, y)$ from corresponding terms.",
                "formula": "$$(0,0), (2,6), (4,12) \\implies y = 3x$$",
                "workedExample": {
                  "problem": "Pattern X adds 3 (0, 3, 6, 9) and Pattern Y adds 9 (0, 9, 18, 27). Find the 4th pair.",
                  "steps": [
                    "The 4th terms are $x=9$ and $y=27 \\implies (9, 27)$."
                  ],
                  "answer": "(9, 27)"
                },
                "quickCheck": {
                  "question": "How is Y related to X above?",
                  "options": [
                    "Y is 3 times X",
                    "Y is X + 3",
                    "Y equals X",
                    "Y is half of X"
                  ],
                  "correctIndex": 0,
                  "explanation": "Each Y term is 3 times the X term."
                },
                "visualType": "linear_trajectory",
                "caption": "Graphing two-rule patterns."
              }
            ],
            "takeaways": [
              "Parentheses $(\\;)$ are evaluated first, then $\\times/\\div$, then $+ / -$.",
              "In $(x, y)$, $x$ is horizontal distance from 0 and $y$ is vertical distance from 0.",
              "Corresponding terms of two constant-step patterns form a straight line."
            ],
            "quiz": {
              "topic": "Coordinate Plane, Order of Operations & Patterns",
              "questions": [
                {
                  "question": "Evaluate $5 + 4 \\times (8 - 3)$.",
                  "options": [
                    "25",
                    "45",
                    "34",
                    "29"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$5 + 4 \\times 5 = 25$."
                },
                {
                  "question": "Which point lies on the y-axis?",
                  "options": [
                    "$(0, 6)$",
                    "$(6, 0)$",
                    "$(6, 6)$",
                    "$(1, 6)$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$x = 0$ on the y-axis."
                },
                {
                  "question": "Write 'multiply the sum of 4 and 5 by 2'.",
                  "options": [
                    "$2 \\times (4 + 5)$",
                    "$2 \\times 4 + 5$",
                    "$4 + 5 \\times 2$",
                    "$(2 \\times 4) + 5$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "Use parentheses around $4 + 5$."
                }
              ]
            },
            "xpReward": 165
          }
        ]
      }
    ]
  },
  {
    "grade": 6,
    "gradeName": "Grade 6 — Ratios, Rational Numbers, Expressions & Equations",
    "stage": "middle",
    "description": "Ratios, unit rates & percentages, dividing fractions, negative integers & 4-quadrant graphing, and one-variable algebra.",
    "topics": [
      {
        "id": "g6-ratios",
        "grade": 6,
        "stage": "middle",
        "title": "Ratios, Unit Rates & Percentages",
        "domain": "Numerical Reasoning (NR)",
        "standardCode": "6.NR.1",
        "description": "Understand ratio concepts, compute unit rates, and solve percent problems using proportional reasoning.",
        "icon": "⚖️",
        "xpReward": 180,
        "lessons": [
          {
            "id": "g6-l1-unit-rates",
            "topicId": "g6-ratios",
            "grade": 6,
            "title": "Unit Rates, Ratio Tables & Percentages",
            "standard": {
              "code": "6.NR.1.1",
              "domain": "Numerical Reasoning (NR)",
              "description": "Calculate unit rates associated with ratios of quantities and solve percent problems.",
              "grade": 6
            },
            "objectives": [
              "Write ratios and generate equivalent ratio tables.",
              "Calculate unit rates where the second quantity is 1 unit.",
              "Find a percent of a quantity as a rate per 100."
            ],
            "scenes": [
              {
                "id": "g6-l1-unit-rates-s1",
                "title": "Step 1: Ratios & Unit Rates",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "360 km in 3 seconds divides to a unit rate of 120 km per 1 second!",
                "explanation": "Divide the first quantity by the second quantity to find the unit rate.",
                "formula": "$$\\text{Unit Rate} = \\frac{a}{b}$$",
                "workedExample": {
                  "problem": "5 rations cost $17.50. Find the unit cost.",
                  "steps": [
                    "$17.50 \\div 5 = \\$3.50$ per ration."
                  ],
                  "answer": "$3.50"
                },
                "quickCheck": {
                  "question": "A rover drives 180 m in 6 min. What is its unit speed?",
                  "options": [
                    "30 m/min",
                    "25 m/min",
                    "36 m/min",
                    "60 m/min"
                  ],
                  "correctIndex": 0,
                  "explanation": "180 ÷ 6 = 30 m/min."
                },
                "visualType": "linear_trajectory",
                "caption": "Unit rate slope."
              },
              {
                "id": "g6-l1-unit-rates-s2",
                "title": "Step 2: Equivalent Ratio Tables",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "Scaling a 2:5 ratio by 4 gives 8:20!",
                "explanation": "Multiply both quantities by the same scale factor $k$.",
                "formula": "$$a : b = (ka) : (kb)$$",
                "workedExample": {
                  "problem": "A $3:4$ mix uses 15 cups of blue. How much yellow is needed?",
                  "steps": [
                    "Scale factor $= 15 \\div 3 = 5$.",
                    "Yellow $= 4 \\times 5 = 20$ cups."
                  ],
                  "answer": "20 cups"
                },
                "quickCheck": {
                  "question": "Which ratio is equivalent to $4:7$?",
                  "options": [
                    "12:21",
                    "8:11",
                    "7:4",
                    "16:24"
                  ],
                  "correctIndex": 0,
                  "explanation": "Multiply both by 3: 12:21."
                },
                "visualType": "fraction_galaxy",
                "caption": "Ratio bar scaling."
              },
              {
                "id": "g6-l1-unit-rates-s3",
                "title": "Step 3: Percentages as Rates per 100",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "To find 65% of 400, multiply 0.65 × 400 = 260!",
                "explanation": "Convert percent to decimal or fraction over 100 and multiply by the whole.",
                "formula": "$$\\text{Part} = \\frac{p}{100} \\times \\text{Whole}$$",
                "workedExample": {
                  "problem": "Find $30\\%$ of $250$.",
                  "steps": [
                    "$0.30 \\times 250 = 75$."
                  ],
                  "answer": "75"
                },
                "quickCheck": {
                  "question": "What is $25\\%$ of $80$?",
                  "options": [
                    "20",
                    "25",
                    "16",
                    "40"
                  ],
                  "correctIndex": 0,
                  "explanation": "0.25 × 80 = 20."
                },
                "visualType": "fraction_galaxy",
                "caption": "Percent bar model."
              }
            ],
            "takeaways": [
              "A unit rate has a denominator of 1 unit ($a/b$).",
              "Percent means per 100: $p\\% = \\frac{p}{100}$.",
              "Equivalent ratios multiply or divide both terms by the same number."
            ],
            "quiz": {
              "topic": "Ratios, Unit Rates & Percentages",
              "questions": [
                {
                  "question": "A satellite travels 240 miles in 4 minutes. What is its speed?",
                  "options": [
                    "60 miles/min",
                    "80 miles/min",
                    "50 miles/min",
                    "40 miles/min"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$240 \\div 4 = 60$."
                },
                {
                  "question": "Which ratio is equivalent to $3:5$?",
                  "options": [
                    "$6:10$",
                    "$5:3$",
                    "$9:12$",
                    "$6:12$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "Multiply by 2."
                },
                {
                  "question": "What is $40\\%$ of $150$?",
                  "options": [
                    "60",
                    "40",
                    "50",
                    "75"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$0.40 \\times 150 = 60$."
                }
              ]
            },
            "xpReward": 180
          }
        ]
      },
      {
        "id": "g6-fraction-div",
        "grade": 6,
        "stage": "middle",
        "title": "Dividing Fractions & Multi-Digit Decimals",
        "domain": "Numerical Reasoning (NR)",
        "standardCode": "6.NR.2",
        "description": "Divide fractions by fractions using visual models and reciprocals, and compute with multi-digit decimals.",
        "icon": "➗",
        "xpReward": 180,
        "lessons": [
          {
            "id": "g6-l2-divide-fractions",
            "topicId": "g6-fraction-div",
            "grade": 6,
            "title": "Dividing Fractions by Fractions (Reciprocals)",
            "standard": {
              "code": "6.NR.2.1",
              "domain": "Numerical Reasoning (NR)",
              "description": "Compute quotients of fractions and solve word problems involving division of fractions by fractions.",
              "grade": 6
            },
            "objectives": [
              "Interpret $\\frac{a}{b} \\div \\frac{c}{d}$ visually.",
              "Multiply by the reciprocal: $\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}$.",
              "Divide multi-digit decimals accurately."
            ],
            "scenes": [
              {
                "id": "g6-l2-divide-fractions-s1",
                "title": "Step 1: Visual Fraction Division",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "How many 1/4s fit inside 3/4? Exactly 3!",
                "explanation": "With common denominators, divide the numerators: $\\frac{a}{d} \\div \\frac{b}{d} = \\frac{a}{b}$.",
                "formula": "$$\\frac{a}{d} \\div \\frac{b}{d} = \\frac{a}{b}$$",
                "workedExample": {
                  "problem": "Evaluate $\\frac{6}{8} \\div \\frac{2}{8}$.",
                  "steps": [
                    "Divide numerators: $6 \\div 2 = 3$."
                  ],
                  "answer": "3"
                },
                "quickCheck": {
                  "question": "How many $\\frac{1}{5}$s are in $\\frac{4}{5}$?",
                  "options": [
                    "4",
                    "5",
                    "1/4",
                    "20"
                  ],
                  "correctIndex": 0,
                  "explanation": "4/5 ÷ 1/5 = 4."
                },
                "visualType": "fraction_galaxy",
                "caption": "Measuring divisor strips."
              },
              {
                "id": "g6-l2-divide-fractions-s2",
                "title": "Step 2: Multiplying by the Reciprocal",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "Keep-Change-Flip: multiply the first fraction by the reciprocal of the second!",
                "explanation": "Dividing by $\\frac{c}{d}$ is multiplying by $\\frac{d}{c}$.",
                "formula": "$$\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}$$",
                "workedExample": {
                  "problem": "Compute $\\frac{2}{3} \\div \\frac{4}{5}$.",
                  "steps": [
                    "$\\frac{2}{3} \\times \\frac{5}{4} = \\frac{10}{12} = \\frac{5}{6}$."
                  ],
                  "answer": "5/6"
                },
                "quickCheck": {
                  "question": "What is the reciprocal of $\\frac{3}{7}$?",
                  "options": [
                    "7/3",
                    "3/7",
                    "-3/7",
                    "1/21"
                  ],
                  "correctIndex": 0,
                  "explanation": "Flip top and bottom: 7/3."
                },
                "visualType": "fraction_galaxy",
                "caption": "Reciprocal multiplication."
              },
              {
                "id": "g6-l2-divide-fractions-s3",
                "title": "Step 3: Dividing Multi-Digit Decimals",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "Multiply both 3.6 and 0.09 by 100 to turn 3.6 ÷ 0.09 into 360 ÷ 9 = 40!",
                "explanation": "Shift the decimal point right in both numbers until the divisor is whole.",
                "formula": "$$\\frac{3.6}{0.09} = \\frac{360}{9} = 40$$",
                "workedExample": {
                  "problem": "Divide $7.5 \\div 0.25$.",
                  "steps": [
                    "Multiply both by $100$: $750 \\div 25 = 30$."
                  ],
                  "answer": "30"
                },
                "quickCheck": {
                  "question": "What is $4.8 \\div 0.6$?",
                  "options": [
                    "8",
                    "0.8",
                    "80",
                    "0.08"
                  ],
                  "correctIndex": 0,
                  "explanation": "48 ÷ 6 = 8."
                },
                "visualType": "number_line",
                "caption": "Decimal division scaling."
              }
            ],
            "takeaways": [
              "Two numbers are reciprocals if their product is 1 ($\\frac{c}{d} \\cdot \\frac{d}{c} = 1$).",
              "Keep the first fraction, change $\\div$ to $\\times$, and flip the divisor.",
              "Shift decimals equally in dividend and divisor to make the divisor a whole number."
            ],
            "quiz": {
              "topic": "Dividing Fractions & Multi-Digit Decimals",
              "questions": [
                {
                  "question": "What is $\\frac{3}{4} \\div \\frac{1}{8}$?",
                  "options": [
                    "6",
                    "$\\frac{3}{32}$",
                    "$\\frac{1}{6}$",
                    "4"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$\\frac{3}{4} \\times 8 = 6$."
                },
                {
                  "question": "Evaluate $\\frac{4}{5} \\div \\frac{2}{3}$.",
                  "options": [
                    "$\\frac{6}{5}$",
                    "$\\frac{8}{15}$",
                    "$\\frac{5}{6}$",
                    "$\\frac{2}{5}$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$\\frac{4}{5}\\times\\frac{3}{2}=\\frac{12}{10}=\\frac{6}{5}$."
                },
                {
                  "question": "What is $6.4 \\div 0.8$?",
                  "options": [
                    "8",
                    "0.8",
                    "80",
                    "5.6"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$64 \\div 8 = 8$."
                }
              ]
            },
            "xpReward": 180
          }
        ]
      },
      {
        "id": "g6-integers-quadrants",
        "grade": 6,
        "stage": "middle",
        "title": "Negative Numbers, Absolute Value & 4 Quadrants",
        "domain": "Numerical Reasoning (NR)",
        "standardCode": "6.NR.3",
        "description": "Understand positive and negative rational numbers, opposites, absolute value $|x|$, and graphing in all four quadrants.",
        "icon": "🧭",
        "xpReward": 185,
        "lessons": [
          {
            "id": "g6-l3-integers-abs",
            "topicId": "g6-integers-quadrants",
            "grade": 6,
            "title": "Integers, Absolute Value & 4-Quadrant Graphing",
            "standard": {
              "code": "6.NR.3.1",
              "domain": "Numerical Reasoning (NR)",
              "description": "Order signed numbers, interpret absolute value as distance from zero, and plot coordinates in Quadrants I–IV.",
              "grade": 6
            },
            "objectives": [
              "Order positive and negative numbers on a number line.",
              "Evaluate absolute value $|x|$ as non-negative distance from 0.",
              "Plot points $(x, y)$ in all four quadrants and find horizontal/vertical distances."
            ],
            "scenes": [
              {
                "id": "g6-l3-integers-abs-s1",
                "title": "Step 1: Positive & Negative Integers",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "Numbers to the right of 0 are positive; numbers to the left are negative. -2 is warmer than -8!",
                "explanation": "Any number to the right on the number line is greater.",
                "formula": "$$-8 < -2 < 0 < 5$$",
                "workedExample": {
                  "problem": "Compare $-4$ and $-11$.",
                  "steps": [
                    "$-4$ is to the right of $-11$, so $-4 > -11$."
                  ],
                  "answer": "-4 > -11"
                },
                "quickCheck": {
                  "question": "Which inequality is TRUE?",
                  "options": [
                    "-3 > -10",
                    "-10 > -3",
                    "-5 > 0",
                    "-8 > -1"
                  ],
                  "correctIndex": 0,
                  "explanation": "-3 is to the right of -10."
                },
                "visualType": "number_line",
                "caption": "Signed integer number line."
              },
              {
                "id": "g6-l3-integers-abs-s2",
                "title": "Step 2: Absolute Value |x|",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "Both -15 and +15 are a distance of 15 units from zero!",
                "explanation": "Absolute value measures magnitude (distance from 0) and is never negative.",
                "formula": "$$|-15| = 15, \\qquad |15| = 15$$",
                "workedExample": {
                  "problem": "Evaluate $|-9| + |4|$.",
                  "steps": [
                    "$9 + 4 = 13$."
                  ],
                  "answer": "13"
                },
                "quickCheck": {
                  "question": "What is $|-22|$?",
                  "options": [
                    "22",
                    "-22",
                    "0",
                    "1/22"
                  ],
                  "correctIndex": 0,
                  "explanation": "Distance from 0 is 22."
                },
                "visualType": "number_line",
                "caption": "Distance from zero."
              },
              {
                "id": "g6-l3-integers-abs-s3",
                "title": "Step 3: Four-Quadrant Coordinate Plane",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "Negative coordinates extend the grid into four quadrants: QI (+,+), QII (-,+), QIII (-,-), QIV (+,-)!",
                "explanation": "Add distances to the axis when points cross into different quadrants.",
                "formula": "$$\\text{QII: } (-, +), \\quad \\text{QIII: } (-, -), \\quad \\text{QIV: } (+, -)$$",
                "workedExample": {
                  "problem": "Find the distance between $(-4, -7)$ and $(-4, 3)$.",
                  "steps": [
                    "Same x-coordinate ($-4$). Add vertical distances: $|-7| + |3| = 10$."
                  ],
                  "answer": "10 units"
                },
                "quickCheck": {
                  "question": "Which quadrant contains $(-5, 8)$?",
                  "options": [
                    "Quadrant II",
                    "Quadrant I",
                    "Quadrant III",
                    "Quadrant IV"
                  ],
                  "correctIndex": 0,
                  "explanation": "Left (-) and Up (+) is Quadrant II."
                },
                "visualType": "linear_trajectory",
                "caption": "Four-quadrant plane."
              }
            ],
            "takeaways": [
              "Numbers further right on a number line are always greater ($-2 > -8$).",
              "Absolute value $|x| \\ge 0$ is distance from zero.",
              "Quadrants: QI $(+,+)$, QII $(-,+)$, QIII $(-,-)$, QIV $(+,-)$."
            ],
            "quiz": {
              "topic": "Negative Numbers, Absolute Value & 4 Quadrants",
              "questions": [
                {
                  "question": "What is $|-15|$?",
                  "options": [
                    "15",
                    "-15",
                    "0",
                    "30"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "Distance from 0 is 15."
                },
                {
                  "question": "Which number is smallest?",
                  "options": [
                    "-18",
                    "-4",
                    "0",
                    "2"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "-18 is furthest left."
                },
                {
                  "question": "What is the distance between $(-3, 5)$ and $(4, 5)$?",
                  "options": [
                    "7 units",
                    "1 unit",
                    "10 units",
                    "8 units"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$|-3| + |4| = 7$ units."
                }
              ]
            },
            "xpReward": 185
          }
        ]
      },
      {
        "id": "g6-algebra-expressions",
        "grade": 6,
        "stage": "middle",
        "title": "Algebraic Expressions & One-Step Equations",
        "domain": "Patterning & Algebraic Reasoning (PAR)",
        "standardCode": "6.PAR.6",
        "description": "Evaluate algebraic expressions with exponents, combine like terms, and solve one-step equations $x + p = q$ and $px = q$.",
        "icon": "🔤",
        "xpReward": 185,
        "lessons": [
          {
            "id": "g6-l4-one-step-eq",
            "topicId": "g6-algebra-expressions",
            "grade": 6,
            "title": "Variables, Equivalent Expressions & One-Step Equations",
            "standard": {
              "code": "6.PAR.6.1",
              "domain": "Patterning & Algebraic Reasoning (PAR)",
              "description": "Evaluate algebraic expressions, combine like terms, and solve one-step equations using inverse operations.",
              "grade": 6
            },
            "objectives": [
              "Substitute values into algebraic expressions with exponents.",
              "Use the Distributive Property and combine like terms.",
              "Solve one-step equations by balancing both sides."
            ],
            "scenes": [
              {
                "id": "g6-l4-one-step-eq-s1",
                "title": "Step 1: Evaluating Algebraic Expressions",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "To evaluate 3x² + 4 at x = 2, square 2 first (4), multiply by 3 (12), and add 4 to get 16!",
                "explanation": "Substitute the given number for the variable and follow PEMDAS.",
                "formula": "$$3(2)^2 + 4 = 3(4) + 4 = 16$$",
                "workedExample": {
                  "problem": "Evaluate $5y - 2^3$ when $y = 4$.",
                  "steps": [
                    "$5(4) - 8 = 20 - 8 = 12$."
                  ],
                  "answer": "12"
                },
                "quickCheck": {
                  "question": "What is $2n^2 + 5$ when $n = 3$?",
                  "options": [
                    "23",
                    "41",
                    "17",
                    "21"
                  ],
                  "correctIndex": 0,
                  "explanation": "2(9) + 5 = 23."
                },
                "visualType": "linear_trajectory",
                "caption": "Evaluating expressions."
              },
              {
                "id": "g6-l4-one-step-eq-s2",
                "title": "Step 2: Distributive Property & Like Terms",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "Distribute 3 across (x + 4) to get 3x + 12, then combine like terms!",
                "explanation": "Only terms with identical variable parts can be combined.",
                "formula": "$$a(bx + c) = abx + ac$$",
                "workedExample": {
                  "problem": "Simplify $3(x + 4) + 2x - 5$.",
                  "steps": [
                    "$3x + 12 + 2x - 5 = 5x + 7$."
                  ],
                  "answer": "5x + 7"
                },
                "quickCheck": {
                  "question": "Simplify $5(2y + 3)$.",
                  "options": [
                    "10y + 15",
                    "10y + 3",
                    "7y + 8",
                    "25y"
                  ],
                  "correctIndex": 0,
                  "explanation": "5×2y + 5×3 = 10y + 15."
                },
                "visualType": "fraction_galaxy",
                "caption": "Combining like terms."
              },
              {
                "id": "g6-l4-one-step-eq-s3",
                "title": "Step 3: Solving One-Step Equations",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "Undo addition with subtraction, and undo multiplication with division on both sides!",
                "explanation": "Keep the equation balanced by performing the same operation on both sides.",
                "formula": "$$px = q \\implies x = \\frac{q}{p}$$",
                "workedExample": {
                  "problem": "Solve $x - 9 = 15$ and $6m = 42$.",
                  "steps": [
                    "$x = 15 + 9 = 24$; $m = 42 \\div 6 = 7$."
                  ],
                  "answer": "x = 24, m = 7"
                },
                "quickCheck": {
                  "question": "Solve $7k = 63$.",
                  "options": [
                    "k = 9",
                    "k = 8",
                    "k = 56",
                    "k = 70"
                  ],
                  "correctIndex": 0,
                  "explanation": "63 ÷ 7 = 9."
                },
                "visualType": "linear_trajectory",
                "caption": "Inverse equation balance."
              }
            ],
            "takeaways": [
              "Evaluate exponents before multiplying by coefficients ($3x^2$ at $x=2$ is $3(4)=12$).",
              "Combine terms with the same variable part ($3x + 2x = 5x$).",
              "Use inverse operations ($+\\leftrightarrow -$, $\\times\\leftrightarrow\\div$) to isolate $x$."
            ],
            "quiz": {
              "topic": "Algebraic Expressions & One-Step Equations",
              "questions": [
                {
                  "question": "Simplify $6x + 4 + 2x - 1$.",
                  "options": [
                    "$8x + 3$",
                    "$8x + 5$",
                    "$11x$",
                    "$12x + 3$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$8x + 3$."
                },
                {
                  "question": "Solve $x + 14 = 31$.",
                  "options": [
                    "$x = 17$",
                    "$x = 45$",
                    "$x = 19$",
                    "$x = 16$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$31 - 14 = 17$."
                },
                {
                  "question": "Evaluate $4^3$.",
                  "options": [
                    "64",
                    "12",
                    "16",
                    "81"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$4 \\times 4 \\times 4 = 64$."
                }
              ]
            },
            "xpReward": 185
          }
        ]
      }
    ]
  },
  {
    "grade": 7,
    "gradeName": "Grade 7 — Proportional Relationships, Rational Operations & Geometry",
    "stage": "middle",
    "description": "Proportional relationships ($y = kx$), signed rational arithmetic, two-step equations & inequalities, circles, and probability.",
    "topics": [
      {
        "id": "g7-proportions",
        "grade": 7,
        "stage": "middle",
        "title": "Proportional Relationships ($y = kx$)",
        "domain": "Patterning & Algebraic Reasoning (PAR)",
        "standardCode": "7.PAR.4",
        "description": "Recognize proportional relationships, find constant of proportionality $k = y/x$, and solve percent change problems.",
        "icon": "📈",
        "xpReward": 200,
        "lessons": [
          {
            "id": "g7-l1-constant-k",
            "topicId": "g7-proportions",
            "grade": 7,
            "title": "Constant of Proportionality & Graphing ($y = kx$)",
            "standard": {
              "code": "7.PAR.4.1",
              "domain": "Patterning & Algebraic Reasoning (PAR)",
              "description": "Identify the constant of proportionality k = y/x in tables, graphs, and equations.",
              "grade": 7
            },
            "objectives": [
              "Find $k = y/x$ from proportional tables and graphs.",
              "Write proportional equations $y = kx$.",
              "Solve multi-step percent increase, decrease, tax, and discount problems."
            ],
            "scenes": [
              {
                "id": "g7-l1-constant-k-s1",
                "title": "Step 1: Constant of Proportionality (k = y/x)",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "In a proportional relationship, dividing y by x always gives the same constant k!",
                "explanation": "Once you find $k = \\frac{y}{x}$, write the equation $y = kx$.",
                "formula": "$$k = \\frac{y}{x} \\iff y = kx$$",
                "workedExample": {
                  "problem": "If $y = 36$ when $x = 9$, find $k$ and the equation.",
                  "steps": [
                    "$k = 36 \\div 9 = 4 \\implies y = 4x$."
                  ],
                  "answer": "k = 4, y = 4x"
                },
                "quickCheck": {
                  "question": "If $y = 45$ when $x = 5$, what is $k$?",
                  "options": [
                    "9",
                    "5",
                    "40",
                    "225"
                  ],
                  "correctIndex": 0,
                  "explanation": "45 ÷ 5 = 9."
                },
                "visualType": "linear_trajectory",
                "caption": "Proportional line y = kx."
              },
              {
                "id": "g7-l1-constant-k-s2",
                "title": "Step 2: Proportional Graphs Through (0, 0)",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "A graph is proportional only if it is a straight line AND passes through the origin (0, 0)!",
                "explanation": "The point $(1, k)$ on the graph shows the unit rate $k$.",
                "formula": "$$(0, 0) \\text{ and } (1, k) \\text{ lie on } y = kx$$",
                "workedExample": {
                  "problem": "A line passes through $(0,0)$ and $(4, 28)$. Find the point where $x = 1$.",
                  "steps": [
                    "$k = 28 \\div 4 = 7 \\implies (1, 7)$."
                  ],
                  "answer": "(1, 7)"
                },
                "quickCheck": {
                  "question": "Why is $y = 3x + 5$ NOT proportional?",
                  "options": [
                    "It crosses at (0, 5) instead of (0, 0)",
                    "It is curved",
                    "Slope is negative",
                    "No x variable"
                  ],
                  "correctIndex": 0,
                  "explanation": "It does not pass through (0, 0)."
                },
                "visualType": "linear_trajectory",
                "caption": "Origin test for proportionality."
              },
              {
                "id": "g7-l1-constant-k-s3",
                "title": "Step 3: Percent Increase, Decrease & Discounts",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "Divide the amount of change by the original starting amount to find percent change!",
                "explanation": "For a $20\\%$ discount on $\\$60$, subtract $\\$12$ to get $\\$48$.",
                "formula": "$$\\text{\\% Change} = \\frac{|\\text{New} - \\text{Original}|}{\\text{Original}} \\times 100\\%$$",
                "workedExample": {
                  "problem": "Find the sale price of a $60 item at 20% off.",
                  "steps": [
                    "Discount $= 0.20 \\times 60 = \\$12$. Sale price $= 60 - 12 = \\$48$."
                  ],
                  "answer": "$48"
                },
                "quickCheck": {
                  "question": "A club grows from 50 to 65 members. What is the percent increase?",
                  "options": [
                    "30%",
                    "15%",
                    "25%",
                    "65%"
                  ],
                  "correctIndex": 0,
                  "explanation": "15 / 50 = 30%."
                },
                "visualType": "fraction_galaxy",
                "caption": "Percent change bars."
              }
            ],
            "takeaways": [
              "A proportional graph is a straight line through $(0, 0)$ with unit rate at $(1, k)$.",
              "The equation is $y = kx$ where $k = \\frac{y}{x}$.",
              "Percent change divides the change by the **original** value."
            ],
            "quiz": {
              "topic": "Proportional Relationships ($y = kx$)",
              "questions": [
                {
                  "question": "If $y = 24$ when $x = 6$ in $y = kx$, what is $k$?",
                  "options": [
                    "4",
                    "6",
                    "18",
                    "144"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$24 / 6 = 4$."
                },
                {
                  "question": "Does the line through $(0, 2)$ and $(2, 6)$ represent a proportional relationship?",
                  "options": [
                    "No, it does not pass through (0,0)",
                    "Yes",
                    "Only for positive x",
                    "Cannot tell"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "Must pass through $(0,0)$."
                },
                {
                  "question": "An $80 item has 10% tax added. What is the total?",
                  "options": [
                    "$88",
                    "$8",
                    "$72",
                    "$90"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$80 + 8 = \\$88$."
                }
              ]
            },
            "xpReward": 200
          }
        ]
      },
      {
        "id": "g7-rational-ops",
        "grade": 7,
        "stage": "middle",
        "title": "Operations with Positive & Negative Numbers",
        "domain": "Numerical Reasoning (NR)",
        "standardCode": "7.NR.1",
        "description": "Add, subtract, multiply, and divide positive and negative integers and rational numbers.",
        "icon": "➕",
        "xpReward": 200,
        "lessons": [
          {
            "id": "g7-l2-signed-numbers",
            "topicId": "g7-rational-ops",
            "grade": 7,
            "title": "Adding, Subtracting, Multiplying & Dividing Signed Numbers",
            "standard": {
              "code": "7.NR.1.1",
              "domain": "Numerical Reasoning (NR)",
              "description": "Apply properties of operations to add, subtract, multiply, and divide signed rational numbers.",
              "grade": 7
            },
            "objectives": [
              "Add integers with same and different signs.",
              "Rewrite subtraction as adding the opposite ($a - (-b) = a + b$).",
              "Apply sign rules for multiplication and division."
            ],
            "scenes": [
              {
                "id": "g7-l2-signed-numbers-s1",
                "title": "Step 1: Adding Signed Numbers",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "When signs differ (-9 + 4), subtract magnitudes (9 - 4 = 5) and keep the sign of the larger magnitude (-5)!",
                "explanation": "Same signs add magnitudes; different signs subtract magnitudes.",
                "formula": "$$-9 + 4 = -5, \\qquad -6 + (-5) = -11$$",
                "workedExample": {
                  "problem": "Compute $-14 + 20$.",
                  "steps": [
                    "$20 - 14 = 6$ (positive wins) $\\implies +6$."
                  ],
                  "answer": "6"
                },
                "quickCheck": {
                  "question": "What is $-12 + 5$?",
                  "options": [
                    "-7",
                    "7",
                    "-17",
                    "17"
                  ],
                  "correctIndex": 0,
                  "explanation": "12 - 5 = 7, keep negative sign: -7."
                },
                "visualType": "number_line",
                "caption": "Adding signed integers."
              },
              {
                "id": "g7-l2-signed-numbers-s2",
                "title": "Step 2: Subtracting by Adding the Opposite",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "Keep-Change-Flip: 7 - (-5) becomes 7 + (+5) = 12!",
                "explanation": "Subtracting $b$ is defined as adding $-b$.",
                "formula": "$$a - (-b) = a + b$$",
                "workedExample": {
                  "problem": "Compute $-4 - (-10)$.",
                  "steps": [
                    "Rewrite as $-4 + 10 = 6$."
                  ],
                  "answer": "6"
                },
                "quickCheck": {
                  "question": "What is $7 - (-5)$?",
                  "options": [
                    "12",
                    "2",
                    "-12",
                    "-2"
                  ],
                  "correctIndex": 0,
                  "explanation": "7 + 5 = 12."
                },
                "visualType": "number_line",
                "caption": "Subtracting negative integers."
              },
              {
                "id": "g7-l2-signed-numbers-s3",
                "title": "Step 3: Multiplying & Dividing Signed Numbers",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "Same signs give POSITIVE (+); different signs give NEGATIVE (-)!",
                "explanation": "Two negatives multiply or divide to make a positive.",
                "formula": "$$(-a)(-b) = +ab, \\qquad (-a)(+b) = -ab$$",
                "workedExample": {
                  "problem": "Evaluate $(-6)(-4)$ and $(-36) \\div 9$.",
                  "steps": [
                    "$(-6)(-4) = +24$; $(-36) \\div 9 = -4$."
                  ],
                  "answer": "24 and -4"
                },
                "quickCheck": {
                  "question": "What is $(-8) \\times (-5)$?",
                  "options": [
                    "40",
                    "-40",
                    "-13",
                    "13"
                  ],
                  "correctIndex": 0,
                  "explanation": "Negative × Negative = +40."
                },
                "visualType": "number_line",
                "caption": "Signed multiplication rules."
              }
            ],
            "takeaways": [
              "Subtracting a negative is adding a positive: $a - (-b) = a + b$.",
              "Same signs $\\to$ Positive product/quotient; Different signs $\\to$ Negative.",
              "A number plus its opposite equals 0."
            ],
            "quiz": {
              "topic": "Operations with Positive & Negative Numbers",
              "questions": [
                {
                  "question": "What is $-15 + 9$?",
                  "options": [
                    "-6",
                    "6",
                    "-24",
                    "24"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$-15 + 9 = -6$."
                },
                {
                  "question": "What is $-3 - (-11)$?",
                  "options": [
                    "8",
                    "-14",
                    "-8",
                    "14"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$-3 + 11 = 8$."
                },
                {
                  "question": "Evaluate $(-7) \\times (-6)$.",
                  "options": [
                    "42",
                    "-42",
                    "-13",
                    "36"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$+42$."
                }
              ]
            },
            "xpReward": 200
          }
        ]
      },
      {
        "id": "g7-two-step-equations",
        "grade": 7,
        "stage": "middle",
        "title": "Two-Step Equations & Inequalities",
        "domain": "Patterning & Algebraic Reasoning (PAR)",
        "standardCode": "7.PAR.2",
        "description": "Solve two-step linear equations $px + q = r$ and inequalities, flipping the inequality sign when dividing by a negative.",
        "icon": "⚖️",
        "xpReward": 205,
        "lessons": [
          {
            "id": "g7-l3-two-step",
            "topicId": "g7-two-step-equations",
            "grade": 7,
            "title": "Solving Two-Step Equations & Inequalities",
            "standard": {
              "code": "7.PAR.2.1",
              "domain": "Patterning & Algebraic Reasoning (PAR)",
              "description": "Solve two-step linear equations and inequalities in one variable and interpret solutions.",
              "grade": 7
            },
            "objectives": [
              "Solve $px + q = r$ using inverse operations.",
              "Solve equations with parentheses $p(x + q) = r$.",
              "Reverse the inequality symbol when multiplying or dividing by a negative number."
            ],
            "scenes": [
              {
                "id": "g7-l3-two-step-s1",
                "title": "Step 1: Two-Step Equations (px + q = r)",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "In 3x - 5 = 16, add 5 first to get 3x = 21, then divide by 3 to get x = 7!",
                "explanation": "Isolate the variable term first, then divide by the coefficient.",
                "formula": "$$px + q = r \\implies x = \\frac{r - q}{p}$$",
                "workedExample": {
                  "problem": "Solve $4x + 7 = 31$.",
                  "steps": [
                    "Subtract $7$: $4x = 24$. Divide by $4$: $x = 6$."
                  ],
                  "answer": "x = 6"
                },
                "quickCheck": {
                  "question": "Solve $5x - 8 = 22$.",
                  "options": [
                    "x = 6",
                    "x = 3",
                    "x = 5",
                    "x = 14"
                  ],
                  "correctIndex": 0,
                  "explanation": "5x = 30 -> x = 6."
                },
                "visualType": "linear_trajectory",
                "caption": "Two-step isolation."
              },
              {
                "id": "g7-l3-two-step-s2",
                "title": "Step 2: Equations with Parentheses",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "In 3(2x - 1) = 21, distribute 3 to get 6x - 3 = 21, then solve!",
                "explanation": "Clear parentheses using the Distributive Property.",
                "formula": "$$3(2x - 1) = 21 \\implies 6x = 24 \\implies x = 4$$",
                "workedExample": {
                  "problem": "Solve $2(x + 5) = 24$.",
                  "steps": [
                    "Divide by $2$: $x + 5 = 12 \\implies x = 7$."
                  ],
                  "answer": "x = 7"
                },
                "quickCheck": {
                  "question": "Solve $4(x - 2) = 20$.",
                  "options": [
                    "x = 7",
                    "x = 3",
                    "x = 5",
                    "x = 6"
                  ],
                  "correctIndex": 0,
                  "explanation": "x - 2 = 5 -> x = 7."
                },
                "visualType": "linear_trajectory",
                "caption": "Distributive equations."
              },
              {
                "id": "g7-l3-two-step-s3",
                "title": "Step 3: Inequalities & Flipping the Sign",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "When dividing both sides of -2x ≥ 8 by -2, flip ≥ to ≤ so x ≤ -4!",
                "explanation": "Multiplying or dividing by a negative reverses order on the number line.",
                "formula": "$$-2x \\ge 8 \\xrightarrow{\\div (-2)} x \\le -4$$",
                "workedExample": {
                  "problem": "Solve $-3x + 4 < 19$.",
                  "steps": [
                    "Subtract $4$: $-3x < 15$. Divide by $-3$ and flip: $x > -5$."
                  ],
                  "answer": "x > -5"
                },
                "quickCheck": {
                  "question": "Solve $-4x < 20$.",
                  "options": [
                    "x > -5",
                    "x < -5",
                    "x > 5",
                    "x < 24"
                  ],
                  "correctIndex": 0,
                  "explanation": "Divide by -4 and flip < to >."
                },
                "visualType": "number_line",
                "caption": "Inequality solution ray."
              }
            ],
            "takeaways": [
              "Undo addition/subtraction first, then undo multiplication/division.",
              "Distribute $p(x+q) = px + pq$ or divide by $p$ first.",
              "Dividing both sides by a negative flips $<$ and $>$."
            ],
            "quiz": {
              "topic": "Two-Step Equations & Inequalities",
              "questions": [
                {
                  "question": "Solve $3x - 5 = 16$.",
                  "options": [
                    "$x = 7$",
                    "$x = 5$",
                    "$x = 11$",
                    "$x = 8$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$3x = 21 \\implies x = 7$."
                },
                {
                  "question": "Solve $4(x - 2) = 20$.",
                  "options": [
                    "$x = 7$",
                    "$x = 3$",
                    "$x = 5.5$",
                    "$x = 6$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$x - 2 = 5 \\implies x = 7$."
                },
                {
                  "question": "Solve $-5x > 30$.",
                  "options": [
                    "$x < -6$",
                    "$x > -6$",
                    "$x < 6$",
                    "$x > 25$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "Flip sign when dividing by $-5$."
                }
              ]
            },
            "xpReward": 205
          }
        ]
      },
      {
        "id": "g7-circles-probability",
        "grade": 7,
        "stage": "middle",
        "title": "Circles ($C = 2\\pi r, A = \\pi r^2$), Angles & Probability",
        "domain": "Geometric & Spatial Reasoning (GSR)",
        "standardCode": "7.GSR.5",
        "description": "Calculate circumference and area of circles, solve angle pair equations, and find theoretical probabilities.",
        "icon": "⭕",
        "xpReward": 205,
        "lessons": [
          {
            "id": "g7-l4-circles-angles",
            "topicId": "g7-circles-probability",
            "grade": 7,
            "title": "Circle Area & Circumference, Angle Pairs & Probability",
            "standard": {
              "code": "7.GSR.5.1",
              "domain": "Geometric & Spatial Reasoning (GSR)",
              "description": "Apply circle formulas, angle relationships, and theoretical probability models.",
              "grade": 7
            },
            "objectives": [
              "Calculate $C = 2\\pi r$ and $A = \\pi r^2$.",
              "Solve Complementary ($90^\\circ$), Supplementary ($180^\\circ$), and Vertical angle problems.",
              "Find theoretical probability $P(E) = \\frac{\\text{favorable}}{\\text{total}}$."
            ],
            "scenes": [
              {
                "id": "g7-l4-circles-angles-s1",
                "title": "Step 1: Circumference & Area of Circles",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "Circumference is C = 2πr and Area is A = πr²!",
                "explanation": "Square the radius for area; double the radius for circumference.",
                "formula": "$$C = 2\\pi r, \\qquad A = \\pi r^2$$",
                "workedExample": {
                  "problem": "Find $C$ and $A$ for radius $r = 5\\text{ m}$.",
                  "steps": [
                    "$C = 10\\pi\\text{ m}$, $A = 25\\pi\\text{ m}^2$."
                  ],
                  "answer": "10π m and 25π m²"
                },
                "quickCheck": {
                  "question": "If diameter $d = 12\\text{ cm}$, what is the area $A$?",
                  "options": [
                    "36π cm²",
                    "144π cm²",
                    "12π cm²",
                    "24π cm²"
                  ],
                  "correctIndex": 0,
                  "explanation": "r = 6 cm, so A = π(6)² = 36π cm²."
                },
                "visualType": "geometry_shapes",
                "caption": "Circle radius, diameter, and area."
              },
              {
                "id": "g7-l4-circles-angles-s2",
                "title": "Step 2: Angle Pair Equations",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "Complementary angles add to 90°, supplementary add to 180°, and vertical angles are equal!",
                "explanation": "Set up an algebraic equation based on the angle pair relationship.",
                "formula": "$$\\text{Comp: } 90^\\circ, \\quad \\text{Supp: } 180^\\circ, \\quad \\text{Vert: } \\angle 1 = \\angle 2$$",
                "workedExample": {
                  "problem": "Supplementary angles are $(2x+10)^\\circ$ and $70^\\circ$. Find $x$.",
                  "steps": [
                    "$2x + 80 = 180 \\implies 2x = 100 \\implies x = 50$."
                  ],
                  "answer": "x = 50"
                },
                "quickCheck": {
                  "question": "What is the supplement of $65^\\circ$?",
                  "options": [
                    "115°",
                    "25°",
                    "65°",
                    "125°"
                  ],
                  "correctIndex": 0,
                  "explanation": "180° - 65° = 115°."
                },
                "visualType": "geometry_shapes",
                "caption": "Angle pair geometry."
              },
              {
                "id": "g7-l4-circles-angles-s3",
                "title": "Step 3: Theoretical Probability",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "Probability is favorable outcomes divided by total possible outcomes!",
                "explanation": "Subtract $P(E)$ from 1 to find the probability of the complement.",
                "formula": "$$P(E) = \\frac{\\text{Favorable}}{\\text{Total}}, \\qquad P(\\text{not } E) = 1 - P(E)$$",
                "workedExample": {
                  "problem": "A bag has 4 blue, 5 red, and 1 gold marble. Find $P(\\text{blue})$.",
                  "steps": [
                    "$4 / 10 = 2/5 = 40\\%$."
                  ],
                  "answer": "2/5 (40%)"
                },
                "quickCheck": {
                  "question": "If $P(\\text{rain}) = 0.25$, what is $P(\\text{no rain})$?",
                  "options": [
                    "0.75",
                    "0.25",
                    "0.50",
                    "1.25"
                  ],
                  "correctIndex": 0,
                  "explanation": "1 - 0.25 = 0.75."
                },
                "visualType": "fraction_galaxy",
                "caption": "Probability ratio."
              }
            ],
            "takeaways": [
              "$d = 2r$, $C = \\pi d = 2\\pi r$, and $A = \\pi r^2$.",
              "Complementary $= 90^\\circ$, Supplementary $= 180^\\circ$, Vertical $=$ equal.",
              "$0 \\le P(E) \\le 1$ and $P(\\text{not } E) = 1 - P(E)$."
            ],
            "quiz": {
              "topic": "Circles ($C = 2\\pi r, A = \\pi r^2$), Angles & Probability",
              "questions": [
                {
                  "question": "What is the area of a circle with radius $r = 4\\text{ in}$?",
                  "options": [
                    "$16\\pi\\text{ in}^2$",
                    "$8\\pi\\text{ in}^2$",
                    "$4\\pi\\text{ in}^2$",
                    "$32\\pi\\text{ in}^2$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$\\pi(4)^2 = 16\\pi$."
                },
                {
                  "question": "Complementary angles sum to $90^\\circ$. If one is $37^\\circ$, what is the other?",
                  "options": [
                    "$53^\\circ$",
                    "$143^\\circ$",
                    "$63^\\circ$",
                    "$43^\\circ$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$90 - 37 = 53^\\circ$."
                },
                {
                  "question": "On an 8-section spinner (1–8), what is $P(\\text{number} > 6)$?",
                  "options": [
                    "$\\frac{1}{4}$",
                    "$\\frac{3}{8}$",
                    "$\\frac{6}{8}$",
                    "$\\frac{1}{8}$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "7 and 8 are 2 outcomes out of 8 ($2/8 = 1/4$)."
                }
              ]
            },
            "xpReward": 205
          }
        ]
      }
    ]
  },
  {
    "grade": 8,
    "gradeName": "Grade 8 — Linear Functions, Systems, Pythagorean Theorem & Exponents",
    "stage": "middle",
    "description": "Linear functions ($y = mx + b$), systems of equations, Pythagorean Theorem ($a^2 + b^2 = c^2$), exponents & scientific notation.",
    "topics": [
      {
        "id": "g8-linear-functions",
        "grade": 8,
        "stage": "middle",
        "title": "Linear Functions ($y = mx + b$)",
        "domain": "Functional & Graphical Reasoning (FGR)",
        "standardCode": "8.FGR.5",
        "description": "Construct linear functions, calculate slope $m$, and interpret rate of change and y-intercept $b$.",
        "icon": "📐",
        "xpReward": 220,
        "lessons": [
          {
            "id": "g8-l1-slope-intercept",
            "topicId": "g8-linear-functions",
            "grade": 8,
            "title": "Slope-Intercept Form: Trajectories & Initial Values",
            "standard": {
              "code": "8.FGR.5.1",
              "domain": "Functional & Graphical Reasoning (FGR)",
              "description": "Interpret y = mx + b as defining a linear function with slope m and y-intercept b.",
              "grade": 8
            },
            "objectives": [
              "Calculate slope $m = \\frac{y_2 - y_1}{x_2 - x_1}$ from two points.",
              "Identify $m$ as rate of change and $(0, b)$ as y-intercept.",
              "Write linear equations from graphs, tables, and point pairs."
            ],
            "scenes": [
              {
                "id": "g8-l1-slope-intercept-s1",
                "title": "Step 1: Calculating Slope (Rise Over Run)",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "Divide the vertical change Δy by the horizontal change Δx between any two points on the line!",
                "explanation": "Slope stays constant everywhere along a straight line.",
                "formula": "$$m = \\frac{y_2 - y_1}{x_2 - x_1}$$",
                "workedExample": {
                  "problem": "Find the slope through $(1, 4)$ and $(4, 10)$.",
                  "steps": [
                    "$m = \\frac{10 - 4}{4 - 1} = \\frac{6}{3} = 2$."
                  ],
                  "answer": "m = 2"
                },
                "quickCheck": {
                  "question": "What is the slope through $(2, 5)$ and $(6, 17)$?",
                  "options": [
                    "3",
                    "4",
                    "12",
                    "1/3"
                  ],
                  "correctIndex": 0,
                  "explanation": "(17 - 5)/(6 - 2) = 12/4 = 3."
                },
                "visualType": "linear_trajectory",
                "caption": "Slope triangle rise over run."
              },
              {
                "id": "g8-l1-slope-intercept-s2",
                "title": "Step 2: Slope-Intercept Form (y = mx + b)",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "Launching from b = 10 km at rate m = 3 km/s follows the linear equation y = 3x + 10!",
                "explanation": "$m$ tells how fast $y$ changes; $b$ tells where $y$ starts at $x = 0$.",
                "formula": "$$y = mx + b$$",
                "workedExample": {
                  "problem": "Write the equation of a line with slope $-2$ and y-intercept $(0, 9)$.",
                  "steps": [
                    "Substitute $m=-2, b=9 \\implies y = -2x + 9$."
                  ],
                  "answer": "y = -2x + 9"
                },
                "quickCheck": {
                  "question": "In $y = 5x - 4$, what are $m$ and $b$?",
                  "options": [
                    "m = 5, b = -4",
                    "m = -4, b = 5",
                    "m = 5, b = 4",
                    "m = 1, b = -4"
                  ],
                  "correctIndex": 0,
                  "explanation": "m is coefficient of x (5) and b is constant (-4)."
                },
                "visualType": "linear_trajectory",
                "caption": "Graphing y = mx + b."
              },
              {
                "id": "g8-l1-slope-intercept-s3",
                "title": "Step 3: Finding the Equation from Two Points",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "First calculate slope m, then plug m and one point (x, y) into y = mx + b to solve for b!",
                "explanation": "Every pair of points with distinct x-values determines a unique line.",
                "formula": "$$b = y_1 - m x_1$$",
                "workedExample": {
                  "problem": "Find the line through $(2, 7)$ and $(5, 16)$.",
                  "steps": [
                    "$m = \\frac{16-7}{5-2} = 3$.",
                    "$7 = 3(2) + b \\implies b = 1 \\implies y = 3x + 1$."
                  ],
                  "answer": "y = 3x + 1"
                },
                "quickCheck": {
                  "question": "If $m = 4$ and the line passes through $(1, 6)$, what is $b$?",
                  "options": [
                    "2",
                    "6",
                    "10",
                    "4"
                  ],
                  "correctIndex": 0,
                  "explanation": "6 = 4(1) + b -> b = 2."
                },
                "visualType": "linear_trajectory",
                "caption": "Solving for the y-intercept."
              }
            ],
            "takeaways": [
              "Slope $m = \\frac{\\text{Rise}}{\\text{Run}} = \\frac{y_2 - y_1}{x_2 - x_1}$.",
              "The y-intercept $(0, b)$ is the value of $y$ when $x = 0$.",
              "Slope-intercept form is $y = mx + b$."
            ],
            "quiz": {
              "topic": "Linear Functions ($y = mx + b$)",
              "questions": [
                {
                  "question": "What is the slope of the line passing through $(1, 3)$ and $(3, 9)$?",
                  "options": [
                    "3",
                    "2",
                    "6",
                    "1/3"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$m = \\frac{9-3}{3-1} = 3$."
                },
                {
                  "question": "In $y = -2x + 7$, what is the y-intercept?",
                  "options": [
                    "$(0, 7)$",
                    "$(0, -2)$",
                    "$(7, 0)$",
                    "$(-2, 7)$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$b = 7$ at $x = 0$."
                },
                {
                  "question": "A rover starts 12 m from base and moves at 4 m/s. What is $d(t)$?",
                  "options": [
                    "$d = 4t + 12$",
                    "$d = 12t + 4$",
                    "$d = 16t$",
                    "$d = 4t - 12$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "Rate $4$, initial value $12$."
                }
              ]
            },
            "xpReward": 220,
            "gameId": "game-orbit-slope"
          }
        ]
      },
      {
        "id": "g8-systems-equations",
        "grade": 8,
        "stage": "middle",
        "title": "Systems of Linear Equations",
        "domain": "Functional & Graphical Reasoning (FGR)",
        "standardCode": "8.FGR.7",
        "description": "Solve systems of two linear equations by graphing, substitution, and elimination.",
        "icon": "🔀",
        "xpReward": 225,
        "lessons": [
          {
            "id": "g8-l2-systems",
            "topicId": "g8-systems-equations",
            "grade": 8,
            "title": "Solving Linear Systems by Graphing, Substitution & Elimination",
            "standard": {
              "code": "8.FGR.7.1",
              "domain": "Functional & Graphical Reasoning (FGR)",
              "description": "Analyze and solve pairs of simultaneous linear equations.",
              "grade": 8
            },
            "objectives": [
              "Find the intersection point $(x, y)$ of two lines.",
              "Solve systems algebraically via substitution and elimination.",
              "Identify 1 solution, 0 solutions (parallel), and infinite solutions."
            ],
            "scenes": [
              {
                "id": "g8-l2-systems-s1",
                "title": "Step 1: Graphical Intersection & Solution Cases",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "Two lines with different slopes cross at exactly 1 intersection point (x, y)!",
                "explanation": "Parallel lines never cross (0 solutions); identical lines overlap (infinite solutions).",
                "formula": "$$m_1 \\ne m_2 \\implies 1\\text{ Unique Intersection } (x, y)$$",
                "workedExample": {
                  "problem": "How many solutions do $y = 3x + 2$ and $y = 3x - 5$ have?",
                  "steps": [
                    "Both have slope $m = 3$ but different y-intercepts ($2 \\ne -5$). Parallel $\\implies 0$ solutions."
                  ],
                  "answer": "0 solutions"
                },
                "quickCheck": {
                  "question": "Does $(2, 5)$ solve $y = 2x + 1$ and $x + y = 7$?",
                  "options": [
                    "Yes, both equations are true",
                    "Only the first",
                    "Only the second",
                    "Neither"
                  ],
                  "correctIndex": 0,
                  "explanation": "5 = 2(2)+1 and 2+5 = 7."
                },
                "visualType": "linear_trajectory",
                "caption": "Intersection of two linear graphs."
              },
              {
                "id": "g8-l2-systems-s2",
                "title": "Step 2: Solving by Substitution",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "Replace y in the second equation with the expression from the first equation!",
                "explanation": "Set $m_1 x + b_1 = m_2 x + b_2$ when both equations are solved for $y$.",
                "formula": "$$y = 2x+1, \\; 3x+y=11 \\implies 3x+(2x+1)=11$$",
                "workedExample": {
                  "problem": "Solve $y = 2x + 1$ and $3x + y = 11$.",
                  "steps": [
                    "$5x + 1 = 11 \\implies x = 2$.",
                    "$y = 2(2) + 1 = 5 \\implies (2, 5)$."
                  ],
                  "answer": "(2, 5)"
                },
                "quickCheck": {
                  "question": "Where do $y = 3x$ and $y = x + 8$ intersect?",
                  "options": [
                    "(4, 12)",
                    "(2, 6)",
                    "(4, 4)",
                    "(8, 24)"
                  ],
                  "correctIndex": 0,
                  "explanation": "3x = x + 8 -> 2x = 8 -> x = 4, y = 12."
                },
                "visualType": "linear_trajectory",
                "caption": "Substitution method."
              },
              {
                "id": "g8-l2-systems-s3",
                "title": "Step 3: Solving by Elimination",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "Add x + y = 10 and x - y = 4 straight down so +y and -y cancel to give 2x = 14!",
                "explanation": "Add or subtract equations when variable coefficients are opposites or equal.",
                "formula": "$$(x+y=10) + (x-y=4) \\implies 2x = 14 \\implies x = 7, y = 3$$",
                "workedExample": {
                  "problem": "Solve $2x + 3y = 19$ and $2x - 3y = 1$.",
                  "steps": [
                    "Add equations: $4x = 20 \\implies x = 5$.",
                    "$10 + 3y = 19 \\implies y = 3$. Solution: $(5, 3)$."
                  ],
                  "answer": "(5, 3)"
                },
                "quickCheck": {
                  "question": "If $x + y = 12$ and $x - y = 2$, what is $x$?",
                  "options": [
                    "7",
                    "5",
                    "6",
                    "14"
                  ],
                  "correctIndex": 0,
                  "explanation": "2x = 14 -> x = 7."
                },
                "visualType": "linear_trajectory",
                "caption": "Elimination method."
              }
            ],
            "takeaways": [
              "The intersection $(x, y)$ satisfies both equations.",
              "Parallel lines (same $m$, different $b$) have 0 solutions.",
              "Elimination adds or subtracts equations to cancel a variable."
            ],
            "quiz": {
              "topic": "Systems of Linear Equations",
              "questions": [
                {
                  "question": "Solve $y = 2x$ and $x + y = 15$.",
                  "options": [
                    "$(5, 10)$",
                    "$(3, 6)$",
                    "$(5, 5)$",
                    "$(10, 5)$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$3x = 15 \\implies x = 5, y = 10$."
                },
                {
                  "question": "How many solutions do $y = -4x + 1$ and $y = -4x + 9$ have?",
                  "options": [
                    "0 solutions (parallel)",
                    "1 solution",
                    "2 solutions",
                    "Infinite solutions"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "Same slope, different y-intercepts."
                },
                {
                  "question": "If $x + y = 9$ and $x - y = 5$, find $(x, y)$.",
                  "options": [
                    "$(7, 2)$",
                    "$(6, 3)$",
                    "$(8, 1)$",
                    "$(2, 7)$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$2x = 14 \\implies x = 7, y = 2$."
                }
              ]
            },
            "xpReward": 225
          }
        ]
      },
      {
        "id": "g8-pythagorean",
        "grade": 8,
        "stage": "middle",
        "title": "The Pythagorean Theorem ($a^2 + b^2 = c^2$)",
        "domain": "Geometric & Spatial Reasoning (GSR)",
        "standardCode": "8.GSR.8",
        "description": "Apply the Pythagorean Theorem to find unknown right-triangle sides and distance between coordinate points.",
        "icon": "📐",
        "xpReward": 225,
        "lessons": [
          {
            "id": "g8-l3-pythagoras",
            "topicId": "g8-pythagorean",
            "grade": 8,
            "title": "Pythagorean Theorem & Coordinate Distance",
            "standard": {
              "code": "8.GSR.8.1",
              "domain": "Geometric & Spatial Reasoning (GSR)",
              "description": "Apply a^2 + b^2 = c^2 to solve right triangles in 2D/3D and find distance on the coordinate plane.",
              "grade": 8
            },
            "objectives": [
              "Find hypotenuse $c = \\sqrt{a^2 + b^2}$ or an unknown leg $a = \\sqrt{c^2 - b^2}$.",
              "Test right triangles with the Converse of the Pythagorean Theorem.",
              "Calculate coordinate distance $d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$."
            ],
            "scenes": [
              {
                "id": "g8-l3-pythagoras-s1",
                "title": "Step 1: Finding the Hypotenuse",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "Square both legs, add them together, and take the square root to find hypotenuse c!",
                "explanation": "Applies to all right triangles.",
                "formula": "$$a^2 + b^2 = c^2 \\implies c = \\sqrt{a^2 + b^2}$$",
                "workedExample": {
                  "problem": "Find $c$ when legs are $a = 6$ and $b = 8$.",
                  "steps": [
                    "$c = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$."
                  ],
                  "answer": "10"
                },
                "quickCheck": {
                  "question": "If $a = 5$ and $b = 12$, what is $c$?",
                  "options": [
                    "13",
                    "17",
                    "169",
                    "7"
                  ],
                  "correctIndex": 0,
                  "explanation": "√(25 + 144) = √169 = 13."
                },
                "visualType": "geometry_shapes",
                "caption": "Right triangle squares."
              },
              {
                "id": "g8-l3-pythagoras-s2",
                "title": "Step 2: Finding an Unknown Leg",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "Subtract the known leg squared from the hypotenuse squared, then take the square root!",
                "explanation": "Rearrange $a^2 + b^2 = c^2$ into $a^2 = c^2 - b^2$.",
                "formula": "$$a = \\sqrt{c^2 - b^2}$$",
                "workedExample": {
                  "problem": "Hypotenuse $c = 15$, leg $b = 9$. Find leg $a$.",
                  "steps": [
                    "$a = \\sqrt{15^2 - 9^2} = \\sqrt{225 - 81} = \\sqrt{144} = 12$."
                  ],
                  "answer": "12"
                },
                "quickCheck": {
                  "question": "If $c = 10$ and $b = 8$, what is leg $a$?",
                  "options": [
                    "6",
                    "2",
                    "36",
                    "12.8"
                  ],
                  "correctIndex": 0,
                  "explanation": "√(100 - 64) = √36 = 6."
                },
                "visualType": "geometry_shapes",
                "caption": "Solving for an unknown leg."
              },
              {
                "id": "g8-l3-pythagoras-s3",
                "title": "Step 3: Coordinate Plane Distance Formula",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "Use Δx and Δy as the legs of a right triangle to find straight-line distance between two points!",
                "explanation": "The Distance Formula comes directly from the Pythagorean Theorem.",
                "formula": "$$d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$",
                "workedExample": {
                  "problem": "Find the distance between $(1, 2)$ and $(4, 6)$.",
                  "steps": [
                    "$\\Delta x = 3, \\Delta y = 4 \\implies d = \\sqrt{3^2 + 4^2} = 5$."
                  ],
                  "answer": "5"
                },
                "quickCheck": {
                  "question": "Do sides $7, 24, 25$ form a right triangle?",
                  "options": [
                    "Yes, 7² + 24² = 625 = 25²",
                    "No",
                    "Only if scaled",
                    "Cannot tell"
                  ],
                  "correctIndex": 0,
                  "explanation": "49 + 576 = 625 = 25²."
                },
                "visualType": "linear_trajectory",
                "caption": "Coordinate distance triangle."
              }
            ],
            "takeaways": [
              "Hypotenuse $c$ is opposite the $90^\\circ$ right angle and is the longest side.",
              "To find a leg: $a^2 = c^2 - b^2$.",
              "Common triples: $(3, 4, 5)$, $(5, 12, 13)$, $(6, 8, 10)$, $(8, 15, 17)$."
            ],
            "quiz": {
              "topic": "The Pythagorean Theorem ($a^2 + b^2 = c^2$)",
              "questions": [
                {
                  "question": "What is the hypotenuse of a right triangle with legs 3 and 4?",
                  "options": [
                    "5",
                    "7",
                    "25",
                    "12"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$\\sqrt{9+16} = 5$."
                },
                {
                  "question": "A right triangle has hypotenuse 13 and leg 5. Find the other leg.",
                  "options": [
                    "12",
                    "8",
                    "144",
                    "14"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$\\sqrt{169-25} = 12$."
                },
                {
                  "question": "Find the distance between $(0, 0)$ and $(6, 8)$.",
                  "options": [
                    "10",
                    "14",
                    "100",
                    "2"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$\\sqrt{36+64} = 10$."
                }
              ]
            },
            "xpReward": 225
          }
        ]
      },
      {
        "id": "g8-exponents-scientific",
        "grade": 8,
        "stage": "middle",
        "title": "Exponent Rules, Radicals & Scientific Notation",
        "domain": "Numerical Reasoning (NR)",
        "standardCode": "8.NR.2",
        "description": "Apply integer exponent properties, approximate irrational square roots, and compute with scientific notation.",
        "icon": "🔭",
        "xpReward": 225,
        "lessons": [
          {
            "id": "g8-l4-exponents-sci",
            "topicId": "g8-exponents-scientific",
            "grade": 8,
            "title": "Laws of Exponents & Scientific Notation",
            "standard": {
              "code": "8.NR.2.1",
              "domain": "Numerical Reasoning (NR)",
              "description": "Apply properties of integer exponents and perform operations in scientific notation.",
              "grade": 8
            },
            "objectives": [
              "Use Product ($x^a x^b = x^{a+b}$), Quotient ($x^a/x^b = x^{a-b}$), and Power ($(x^a)^b = x^{ab}$) rules.",
              "Evaluate zero ($x^0=1$) and negative ($x^{-n}=1/x^n$) exponents.",
              "Multiply and divide numbers in scientific notation $a \\times 10^n$."
            ],
            "scenes": [
              {
                "id": "g8-l4-exponents-sci-s1",
                "title": "Step 1: Product, Quotient & Power Rules",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "Add exponents when multiplying same bases; subtract exponents when dividing; multiply exponents for power of a power!",
                "explanation": "Exponent laws simplify large algebraic expressions rapidly.",
                "formula": "$$x^a \\cdot x^b = x^{a+b}, \\quad \\frac{x^a}{x^b} = x^{a-b}, \\quad (x^a)^b = x^{ab}$$",
                "workedExample": {
                  "problem": "Simplify $\\frac{x^5 \\cdot x^4}{x^3}$.",
                  "steps": [
                    "$x^{5+4-3} = x^6$."
                  ],
                  "answer": "x⁶"
                },
                "quickCheck": {
                  "question": "Simplify $(y^3)^4$.",
                  "options": [
                    "y¹²",
                    "y⁷",
                    "4y³",
                    "y⁸¹"
                  ],
                  "correctIndex": 0,
                  "explanation": "3 × 4 = 12."
                },
                "visualType": "number_line",
                "caption": "Exponent laws."
              },
              {
                "id": "g8-l4-exponents-sci-s2",
                "title": "Step 2: Zero and Negative Exponents",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "Any nonzero number to the 0 power is 1, and x⁻ⁿ is the reciprocal 1/xⁿ!",
                "explanation": "Negative exponents mean reciprocals, not negative numbers.",
                "formula": "$$x^0 = 1, \\qquad x^{-n} = \\frac{1}{x^n}$$",
                "workedExample": {
                  "problem": "Evaluate $5^0 + 2^{-3}$.",
                  "steps": [
                    "$1 + \\frac{1}{8} = \\frac{9}{8}$."
                  ],
                  "answer": "9/8"
                },
                "quickCheck": {
                  "question": "What is $4^{-2}$?",
                  "options": [
                    "1/16",
                    "-8",
                    "-16",
                    "1/8"
                  ],
                  "correctIndex": 0,
                  "explanation": "1 / 4² = 1/16."
                },
                "visualType": "fraction_galaxy",
                "caption": "Negative exponent reciprocals."
              },
              {
                "id": "g8-l4-exponents-sci-s3",
                "title": "Step 3: Scientific Notation",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "300,000,000 m/s is written compactly as 3.0 × 10⁸ m/s!",
                "explanation": "Multiply coefficients and add the exponents of 10.",
                "formula": "$$(a \\times 10^m)(b \\times 10^n) = (ab) \\times 10^{m+n}$$",
                "workedExample": {
                  "problem": "Multiply $(2 \\times 10^4)(4 \\times 10^5)$.",
                  "steps": [
                    "$2 \\times 4 = 8$ and $10^{4+5} = 10^9 \\implies 8 \\times 10^9$."
                  ],
                  "answer": "8 × 10⁹"
                },
                "quickCheck": {
                  "question": "Write $0.00045$ in scientific notation.",
                  "options": [
                    "4.5 × 10⁻⁴",
                    "45 × 10⁻⁵",
                    "4.5 × 10⁴",
                    "0.45 × 10⁻³"
                  ],
                  "correctIndex": 0,
                  "explanation": "Shift decimal 4 places right: 4.5 × 10⁻⁴."
                },
                "visualType": "number_line",
                "caption": "Powers of 10 in scientific notation."
              }
            ],
            "takeaways": [
              "Same base product: add exponents; quotient: subtract exponents.",
              "$x^0 = 1$ and $x^{-n} = \\frac{1}{x^n}$.",
              "Scientific notation requires $1 \\le a < 10$."
            ],
            "quiz": {
              "topic": "Exponent Rules, Radicals & Scientific Notation",
              "questions": [
                {
                  "question": "Simplify $x^4 \\cdot x^7$.",
                  "options": [
                    "$x^{11}$",
                    "$x^{28}$",
                    "$2x^{11}$",
                    "$x^3$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$4 + 7 = 11$."
                },
                {
                  "question": "What is $10^{-3}$?",
                  "options": [
                    "$0.001$",
                    "$-30$",
                    "$-1000$",
                    "$0.01$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$1/1000 = 0.001$."
                },
                {
                  "question": "Between which integers does $\\sqrt{50}$ lie?",
                  "options": [
                    "7 and 8",
                    "6 and 7",
                    "8 and 9",
                    "24 and 26"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$49 < 50 < 64$."
                }
              ]
            },
            "xpReward": 225
          }
        ]
      }
    ]
  },
  {
    "grade": 9,
    "gradeName": "Grade 9 — Algebra: Concepts & Connections",
    "stage": "high",
    "description": "Quadratic equations & parabolas, linear sequences & inequalities, exponential modeling, and bivariate statistics.",
    "topics": [
      {
        "id": "g9-quadratics",
        "grade": 9,
        "stage": "high",
        "title": "Quadratic Equations & Parabolic Motion",
        "domain": "Patterning & Algebraic Reasoning (PAR)",
        "standardCode": "A.PAR.6",
        "description": "Solve quadratic equations by factoring, completing the square, and applying the Quadratic Formula.",
        "icon": "🪐",
        "xpReward": 250,
        "lessons": [
          {
            "id": "g9-l1-quad-formula",
            "topicId": "g9-quadratics",
            "grade": 9,
            "title": "Factoring, Discriminant & The Quadratic Formula",
            "standard": {
              "code": "A.PAR.6.1",
              "domain": "Patterning & Algebraic Reasoning (PAR)",
              "description": "Solve quadratic equations ax^2 + bx + c = 0 using factoring and the quadratic formula.",
              "grade": 9
            },
            "objectives": [
              "Factor trinomials $x^2 + bx + c = 0$ and apply the Zero Product Property.",
              "Use the Quadratic Formula $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$.",
              "Use the discriminant $D = b^2 - 4ac$ to determine the number of real roots."
            ],
            "scenes": [
              {
                "id": "g9-l1-quad-formula-s1",
                "title": "Step 1: Factoring & Zero Product Property",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "To solve x² - 5x + 6 = 0, find two numbers that multiply to 6 and add to -5: (-2) and (-3)!",
                "explanation": "Factor into $(x - 2)(x - 3) = 0$, then set each factor to 0.",
                "formula": "$$x^2 + bx + c = (x + p)(x + q) = 0$$",
                "workedExample": {
                  "problem": "Solve $x^2 - 7x + 12 = 0$ by factoring.",
                  "steps": [
                    "Find factors of $12$ that add to $-7$: $-3$ and $-4$.",
                    "$(x - 3)(x - 4) = 0 \\implies x = 3$ or $x = 4$."
                  ],
                  "answer": "x = 3 or x = 4"
                },
                "quickCheck": {
                  "question": "What are the roots of $(x + 5)(x - 2) = 0$?",
                  "options": [
                    "x = -5 and x = 2",
                    "x = 5 and x = -2",
                    "x = 5 and x = 2",
                    "x = -10"
                  ],
                  "correctIndex": 0,
                  "explanation": "Set x + 5 = 0 and x - 2 = 0."
                },
                "visualType": "linear_trajectory",
                "caption": "Parabolic roots (x-intercepts)."
              },
              {
                "id": "g9-l1-quad-formula-s2",
                "title": "Step 2: The Quadratic Formula",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "Any quadratic ax² + bx + c = 0 can be solved using x = (-b ± √(b² - 4ac)) / (2a)!",
                "explanation": "Identify $a, b, c$ carefully including their signs before substituting.",
                "formula": "$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$",
                "workedExample": {
                  "problem": "Solve $2x^2 + 5x - 3 = 0$.",
                  "steps": [
                    "$a=2, b=5, c=-3 \\implies b^2-4ac = 25 - 4(2)(-3) = 49$.",
                    "$x = \\frac{-5 \\pm 7}{4} \\implies x = \\frac{1}{2}$ or $x = -3$."
                  ],
                  "answer": "x = 1/2 or x = -3"
                },
                "quickCheck": {
                  "question": "What is the discriminant $b^2 - 4ac$ of $x^2 - 4x + 4 = 0$?",
                  "options": [
                    "0",
                    "16",
                    "32",
                    "-16"
                  ],
                  "correctIndex": 0,
                  "explanation": "(-4)² - 4(1)(4) = 16 - 16 = 0."
                },
                "visualType": "linear_trajectory",
                "caption": "Quadratic formula and vertex."
              },
              {
                "id": "g9-l1-quad-formula-s3",
                "title": "Step 3: Vertex & Axis of Symmetry",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "The highest or lowest point of a parabola is its vertex at x = -b / (2a)!",
                "explanation": "Substitute $x_v = -\\frac{b}{2a}$ back into $f(x)$ to find the maximum or minimum height.",
                "formula": "$$x_{\\text{vertex}} = -\\frac{b}{2a}, \\qquad f(x) = a(x - h)^2 + k$$",
                "workedExample": {
                  "problem": "Find the vertex of $y = x^2 - 6x + 8$.",
                  "steps": [
                    "$x_v = -\\frac{-6}{2(1)} = 3$.",
                    "$y_v = (3)^2 - 6(3) + 8 = -1$. Vertex: $(3, -1)$."
                  ],
                  "answer": "(3, -1)"
                },
                "quickCheck": {
                  "question": "Does $y = -2(x - 1)^2 + 9$ open upward or downward?",
                  "options": [
                    "Downward (since a = -2 < 0) with maximum 9",
                    "Upward with minimum 9",
                    "Downward with minimum 1",
                    "Upward"
                  ],
                  "correctIndex": 0,
                  "explanation": "Negative leading coefficient a < 0 opens downward."
                },
                "visualType": "linear_trajectory",
                "caption": "Parabola vertex and symmetry."
              }
            ],
            "takeaways": [
              "Zero Product Property: if $(x - r_1)(x - r_2) = 0$, then $x = r_1$ or $x = r_2$.",
              "Vertex x-coordinate is $x = -\\frac{b}{2a}$.",
              "Discriminant $D = b^2 - 4ac$: $D > 0 \\implies 2$ real roots, $D = 0 \\implies 1$ root, $D < 0 \\implies 0$ real roots."
            ],
            "quiz": {
              "topic": "Quadratic Equations & Parabolic Motion",
              "questions": [
                {
                  "question": "What are the solutions to $x^2 - 5x + 6 = 0$?",
                  "options": [
                    "$x = 2$ and $x = 3$",
                    "$x = -2$ and $x = -3$",
                    "$x = 1$ and $x = 6$",
                    "$x = -1$ and $x = 6$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$(x-2)(x-3)=0$."
                },
                {
                  "question": "What does $b^2 - 4ac = 0$ indicate?",
                  "options": [
                    "Exactly one real root (double root)",
                    "Two distinct real roots",
                    "No real roots",
                    "Infinite roots"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "Vertex touches the x-axis once."
                },
                {
                  "question": "What is the x-coordinate of the vertex of $y = x^2 - 6x + 8$?",
                  "options": [
                    "$x = 3$",
                    "$x = -3$",
                    "$x = 6$",
                    "$x = 4$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$-(-6)/(2\\cdot 1) = 3$."
                }
              ]
            },
            "xpReward": 250
          }
        ]
      },
      {
        "id": "g9-linear-inequalities-seq",
        "grade": 9,
        "stage": "high",
        "title": "Linear Functions, Arithmetic Sequences & Inequalities",
        "domain": "Functional & Graphical Reasoning (FGR)",
        "standardCode": "A.FGR.2",
        "description": "Model arithmetic sequences $a_n = a_1 + (n-1)d$, evaluate function notation $f(x)$, and graph linear inequalities.",
        "icon": "📈",
        "xpReward": 250,
        "lessons": [
          {
            "id": "g9-l2-sequences-ineq",
            "topicId": "g9-linear-inequalities-seq",
            "grade": 9,
            "title": "Function Notation, Arithmetic Sequences & Systems of Inequalities",
            "standard": {
              "code": "A.FGR.2.1",
              "domain": "Functional & Graphical Reasoning (FGR)",
              "description": "Use function notation, construct explicit formulas for arithmetic sequences, and graph linear inequalities.",
              "grade": 9
            },
            "objectives": [
              "Evaluate functions using $f(x)$ notation and identify domain and range.",
              "Write explicit formulas $a_n = a_1 + (n-1)d$ for arithmetic sequences.",
              "Graph two-variable linear inequalities using boundary lines and shaded half-planes."
            ],
            "scenes": [
              {
                "id": "g9-l2-sequences-ineq-s1",
                "title": "Step 1: Function Notation f(x), Domain & Range",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "f(4) asks for the output y when x = 4 is plugged into the function rule!",
                "explanation": "Domain is the set of all valid inputs $x$; Range is the set of all resulting outputs $f(x)$.",
                "formula": "$$f(x) = 3x - 2 \\implies f(4) = 3(4) - 2 = 10$$",
                "workedExample": {
                  "problem": "Given $f(x) = -2x + 9$, find $f(3)$.",
                  "steps": [
                    "Substitute $x = 3$: $f(3) = -2(3) + 9 = 3$."
                  ],
                  "answer": "3"
                },
                "quickCheck": {
                  "question": "If $f(x) = 4x + 1$, for what $x$ does $f(x) = 21$?",
                  "options": [
                    "x = 5",
                    "x = 85",
                    "x = 4",
                    "x = 6"
                  ],
                  "correctIndex": 0,
                  "explanation": "4x + 1 = 21 -> 4x = 20 -> x = 5."
                },
                "visualType": "linear_trajectory",
                "caption": "Function input-output mapping."
              },
              {
                "id": "g9-l2-sequences-ineq-s2",
                "title": "Step 2: Arithmetic Sequences",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "An arithmetic sequence adds a constant common difference d from term to term!",
                "explanation": "The $n$-th term starts at $a_1$ and adds $d$ exactly $(n - 1)$ times.",
                "formula": "$$a_n = a_1 + (n - 1)d$$",
                "workedExample": {
                  "problem": "Find the 10th term of $4, 7, 10, 13, \\dots$",
                  "steps": [
                    "First term $a_1 = 4$, common difference $d = 3$.",
                    "$a_{10} = 4 + (10 - 1)(3) = 4 + 27 = 31$."
                  ],
                  "answer": "31"
                },
                "quickCheck": {
                  "question": "What is the common difference $d$ of $12, 8, 4, 0, \\dots$?",
                  "options": [
                    "-4",
                    "4",
                    "-3",
                    "2"
                  ],
                  "correctIndex": 0,
                  "explanation": "8 - 12 = -4."
                },
                "visualType": "linear_trajectory",
                "caption": "Discrete linear points of an arithmetic sequence."
              },
              {
                "id": "g9-l2-sequences-ineq-s3",
                "title": "Step 3: Graphing Two-Variable Linear Inequalities",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "For y > 2x + 1, draw a dashed boundary line and shade the half-plane above the line!",
                "explanation": "Test $(0, 0)$ in the inequality: if true, shade the side containing $(0, 0)$.",
                "formula": "$$y \\ge mx + b \\text{ (Solid, Shade Above)}, \\qquad y < mx + b \\text{ (Dashed, Shade Below)}$$",
                "workedExample": {
                  "problem": "Does $(1, 5)$ satisfy $y > 2x + 1$?",
                  "steps": [
                    "Substitute $(1, 5)$: $5 > 2(1) + 1 = 3$ (True!)."
                  ],
                  "answer": "Yes"
                },
                "quickCheck": {
                  "question": "Which boundary line is used for $y \\le -x + 4$?",
                  "options": [
                    "Solid line, shaded below",
                    "Dashed line, shaded below",
                    "Solid line, shaded above",
                    "Dashed line, shaded above"
                  ],
                  "correctIndex": 0,
                  "explanation": "≤ uses a solid line and shades below."
                },
                "visualType": "linear_trajectory",
                "caption": "Shaded solution half-plane."
              }
            ],
            "takeaways": [
              "$f(x)$ is the output value at input $x$.",
              "Arithmetic sequences have a constant common difference $d$: $a_n = a_1 + (n-1)d$.",
              "For $<$ or $>$, use a dashed line; for $\\le$ or $\\ge$, use a solid line."
            ],
            "quiz": {
              "topic": "Linear Functions, Arithmetic Sequences & Inequalities",
              "questions": [
                {
                  "question": "If $f(x) = 5x - 3$, what is $f(2)$?",
                  "options": [
                    "7",
                    "13",
                    "2",
                    "10"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$5(2) - 3 = 7$."
                },
                {
                  "question": "Find the 8th term of the arithmetic sequence $5, 9, 13, 17, \\dots$",
                  "options": [
                    "33",
                    "37",
                    "29",
                    "32"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$5 + 7(4) = 33$."
                },
                {
                  "question": "Which point is a solution to $y > 3x - 1$?",
                  "options": [
                    "$(0, 2)$",
                    "$(2, 4)$",
                    "$(1, 1)$",
                    "$(3, 5)$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$2 > 3(0) - 1 = -1$ is true."
                }
              ]
            },
            "xpReward": 250
          }
        ]
      },
      {
        "id": "g9-exponential-functions",
        "grade": 9,
        "stage": "high",
        "title": "Exponential Growth, Decay & Geometric Sequences",
        "domain": "Functional & Graphical Reasoning (FGR)",
        "standardCode": "A.FGR.9",
        "description": "Construct and compare linear and exponential functions $f(x) = a \\cdot b^x$, growth/decay rates, and geometric sequences.",
        "icon": "🚀",
        "xpReward": 255,
        "lessons": [
          {
            "id": "g9-l3-exponential",
            "topicId": "g9-exponential-functions",
            "grade": 9,
            "title": "Exponential Growth & Decay ($f(x) = a \\cdot b^x$)",
            "standard": {
              "code": "A.FGR.9.1",
              "domain": "Functional & Graphical Reasoning (FGR)",
              "description": "Model exponential growth and decay and contrast constant ratio growth with constant difference growth.",
              "grade": 9
            },
            "objectives": [
              "Identify initial value $a$ and growth/decay factor $b$ in $f(x) = a \\cdot b^x$.",
              "Model percent growth $y = a(1 + r)^t$ and percent decay $y = a(1 - r)^t$.",
              "Write explicit formulas $a_n = a_1 \\cdot r^{n-1}$ for geometric sequences."
            ],
            "scenes": [
              {
                "id": "g9-l3-exponential-s1",
                "title": "Step 1: Exponential Functions f(x) = a · bˣ",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "Linear functions add a constant each step, whereas exponential functions MULTIPLY by a constant factor b each step!",
                "explanation": "When $x = 0$, $f(0) = a \\cdot b^0 = a$, which is the y-intercept.",
                "formula": "$$f(x) = a \\cdot b^x$$",
                "workedExample": {
                  "problem": "Evaluate $f(x) = 5 \\cdot 2^x$ at $x = 3$.",
                  "steps": [
                    "Compute power first: $2^3 = 8$.",
                    "Multiply by initial value: $5 \\times 8 = 40$."
                  ],
                  "answer": "40"
                },
                "quickCheck": {
                  "question": "In $f(x) = 12(3)^x$, what is the y-intercept?",
                  "options": [
                    "(0, 12)",
                    "(0, 3)",
                    "(0, 36)",
                    "(1, 12)"
                  ],
                  "correctIndex": 0,
                  "explanation": "At x = 0, 12(3)⁰ = 12."
                },
                "visualType": "riemann_sum",
                "caption": "Curved exponential trajectory."
              },
              {
                "id": "g9-l3-exponential-s2",
                "title": "Step 2: Percent Growth (1 + r) vs. Percent Decay (1 - r)",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "If a colony of 500 cells grows by 8% per hour, the growth factor is 1 + 0.08 = 1.08!",
                "explanation": "For decay by rate $r$, subtract from $1$: $b = 1 - r$.",
                "formula": "$$y = a(1 + r)^t \\text{ (Growth)}, \\qquad y = a(1 - r)^t \\text{ (Decay)}$$",
                "workedExample": {
                  "problem": "A $20,000 car depreciates by 15% per year. Write its value function $V(t)$.",
                  "steps": [
                    "Decay factor $b = 1 - 0.15 = 0.85$.",
                    "$V(t) = 20000(0.85)^t$."
                  ],
                  "answer": "V(t) = 20000(0.85)ᵗ"
                },
                "quickCheck": {
                  "question": "What percent change does $y = 100(1.06)^t$ represent?",
                  "options": [
                    "6% growth",
                    "106% growth",
                    "6% decay",
                    "0.06% growth"
                  ],
                  "correctIndex": 0,
                  "explanation": "1.06 = 1 + 0.06, which is 6% growth."
                },
                "visualType": "riemann_sum",
                "caption": "Exponential growth curve."
              },
              {
                "id": "g9-l3-exponential-s3",
                "title": "Step 3: Geometric Sequences",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "In a geometric sequence like 3, 6, 12, 24, each term is multiplied by common ratio r = 2!",
                "explanation": "To reach the $n$-th term from $a_1$, multiply by $r$ exactly $(n - 1)$ times.",
                "formula": "$$a_n = a_1 \\cdot r^{n-1}$$",
                "workedExample": {
                  "problem": "Find the 5th term of $3, 6, 12, 24, \\dots$",
                  "steps": [
                    "$a_1 = 3, r = 2$.",
                    "$a_5 = 3 \\cdot 2^{5-1} = 3 \\cdot 16 = 48$."
                  ],
                  "answer": "48"
                },
                "quickCheck": {
                  "question": "What is the common ratio $r$ of $80, 40, 20, 10, \\dots$?",
                  "options": [
                    "1/2 (0.5)",
                    "2",
                    "-40",
                    "4"
                  ],
                  "correctIndex": 0,
                  "explanation": "40 / 80 = 1/2."
                },
                "visualType": "riemann_sum",
                "caption": "Geometric progression."
              }
            ],
            "takeaways": [
              "In $f(x) = a \\cdot b^x$, $a = f(0)$ is the initial amount and $b$ is the multiplier.",
              "Exponential growth has $b = 1 + r > 1$; exponential decay has $0 < b = 1 - r < 1$.",
              "Exponential functions eventually outgrow any linear function."
            ],
            "quiz": {
              "topic": "Exponential Growth, Decay & Geometric Sequences",
              "questions": [
                {
                  "question": "In $f(x) = 250(0.92)^x$, what is the percent rate of decay?",
                  "options": [
                    "8% decay",
                    "92% decay",
                    "8% growth",
                    "9.2% decay"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$1 - 0.92 = 0.08 = 8\\%$ decay."
                },
                {
                  "question": "Evaluate $f(x) = 4 \\cdot 3^x$ when $x = 2$.",
                  "options": [
                    "36",
                    "144",
                    "24",
                    "18"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$4 \\times 9 = 36$."
                },
                {
                  "question": "What is the next term in the geometric sequence $2, 6, 18, 54, \\dots$?",
                  "options": [
                    "162",
                    "72",
                    "108",
                    "216"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "Multiply by common ratio $3$: $54 \\times 3 = 162$."
                }
              ]
            },
            "xpReward": 255
          }
        ]
      },
      {
        "id": "g9-statistics-regression",
        "grade": 9,
        "stage": "high",
        "title": "Bivariate Statistics, Linear Regression & Correlation",
        "domain": "Data & Statistical Reasoning (DSR)",
        "standardCode": "A.DSR.10",
        "description": "Analyze scatter plots, lines of best fit, correlation coefficient $r$, and distinguish correlation from causation.",
        "icon": "📊",
        "xpReward": 250,
        "lessons": [
          {
            "id": "g9-l4-regression",
            "topicId": "g9-statistics-regression",
            "grade": 9,
            "title": "Scatter Plots, Correlation Coefficient $r$ & Linear Models",
            "standard": {
              "code": "A.DSR.10.1",
              "domain": "Data & Statistical Reasoning (DSR)",
              "description": "Fit linear functions to bivariate data, interpret slope and intercept in context, and interpret the correlation coefficient r.",
              "grade": 9
            },
            "objectives": [
              "Interpret slope and y-intercept of a line of best fit in real-world context.",
              "Interpret correlation coefficient $r$ between $-1$ and $+1$ (strength and direction).",
              "Calculate residuals ($\\text{Actual} - \\text{Predicted}$) and distinguish correlation from causation."
            ],
            "scenes": [
              {
                "id": "g9-l4-regression-s1",
                "title": "Step 1: Lines of Best Fit & Predictions",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "A line of best fit threads through the center of a scatter plot so we can predict y from x!",
                "explanation": "The slope tells the predicted change in $y$ per $1$-unit increase in $x$.",
                "formula": "$$\\hat{y} = mx + b$$",
                "workedExample": {
                  "problem": "Hours studied ($x$) vs. score ($\\hat{y}$) has line $\\hat{y} = 6x + 55$. Predict the score for $x = 5$ hours.",
                  "steps": [
                    "$\\hat{y} = 6(5) + 55 = 30 + 55 = 85$."
                  ],
                  "answer": "85"
                },
                "quickCheck": {
                  "question": "In $\\hat{y} = 6x + 55$, what does the slope $6$ mean?",
                  "options": [
                    "Each extra hour studied predicts +6 points",
                    "Minimum score is 6",
                    "Maximum hours is 6",
                    "55 points per hour"
                  ],
                  "correctIndex": 0,
                  "explanation": "Slope is change in score per 1 hour."
                },
                "visualType": "linear_trajectory",
                "caption": "Line of best fit on a scatter plot."
              },
              {
                "id": "g9-l4-regression-s2",
                "title": "Step 2: Correlation Coefficient r (-1 ≤ r ≤ 1)",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "The correlation coefficient r measures how tightly data points cluster around a straight line!",
                "explanation": "$r = +0.96$ is a very strong positive linear fit; $r = -0.94$ is a very strong negative linear fit.",
                "formula": "$$-1 \\le r \\le +1$$",
                "workedExample": {
                  "problem": "Which correlation coefficient indicates the STRONGEST linear relationship: $r = 0.82$, $r = -0.95$, or $r = 0.15$?",
                  "steps": [
                    "Compare absolute values $|r|$: $|-0.95| = 0.95$ is closest to $1$."
                  ],
                  "answer": "r = -0.95"
                },
                "quickCheck": {
                  "question": "What does $r = -0.92$ describe?",
                  "options": [
                    "Strong negative linear correlation",
                    "Weak negative correlation",
                    "Strong positive correlation",
                    "No correlation"
                  ],
                  "correctIndex": 0,
                  "explanation": "Close to -1 means strong negative."
                },
                "visualType": "linear_trajectory",
                "caption": "Strength and direction of correlation r."
              },
              {
                "id": "g9-l4-regression-s3",
                "title": "Step 3: Residuals & Correlation vs. Causation",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "A residual is Actual minus Predicted (y - ŷ). And remember: just because ice cream sales and sunburns correlate doesn't mean ice cream causes sunburns!",
                "explanation": "A lurking variable (hot summer weather) can cause both variables to rise together.",
                "formula": "$$\\text{Residual} = y - \\hat{y}$$",
                "workedExample": {
                  "problem": "If a student studied 5 hours (predicted $\\hat{y} = 85$) and actually scored $y = 91$, find the residual.",
                  "steps": [
                    "$\\text{Residual} = 91 - 85 = +6$."
                  ],
                  "answer": "+6"
                },
                "quickCheck": {
                  "question": "Does a strong correlation $r = 0.93$ between two variables prove that X causes Y?",
                  "options": [
                    "No, correlation does not prove causation",
                    "Yes, always",
                    "Only if r > 0.90",
                    "Only for positive slopes"
                  ],
                  "correctIndex": 0,
                  "explanation": "Observational correlation never proves causation by itself."
                },
                "visualType": "linear_trajectory",
                "caption": "Measuring vertical residuals from the regression line."
              }
            ],
            "takeaways": [
              "$r$ near $+1$ is strong positive linear correlation; $r$ near $-1$ is strong negative; $r \\approx 0$ is weak/none.",
              "$\\text{Residual} = y_{\\text{actual}} - \\hat{y}_{\\text{predicted}}$.",
              "**Correlation does not imply causation**."
            ],
            "quiz": {
              "topic": "Bivariate Statistics, Linear Regression & Correlation",
              "questions": [
                {
                  "question": "Which $r$ value shows the strongest linear relationship?",
                  "options": [
                    "$-0.97$",
                    "$0.89$",
                    "$0.45$",
                    "$-0.12$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$|-0.97| = 0.97$ is closest to $1$."
                },
                {
                  "question": "If actual $y = 40$ and predicted $\\hat{y} = 44$, what is the residual?",
                  "options": [
                    "$-4$",
                    "$4$",
                    "$84$",
                    "$-0.9$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$y - \\hat{y} = 40 - 44 = -4$."
                },
                {
                  "question": "In $\\hat{y} = 3.5x + 20$, what is the predicted value at $x = 10$?",
                  "options": [
                    "55",
                    "35",
                    "550",
                    "23.5"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$3.5(10) + 20 = 55$."
                }
              ]
            },
            "xpReward": 250
          }
        ]
      }
    ]
  },
  {
    "grade": 10,
    "gradeName": "Grade 10 — Geometry: Concepts & Connections",
    "stage": "high",
    "description": "Right triangle trigonometry (SOH-CAH-TOA), geometric transformations & congruence, similarity, circles, and 3D volume.",
    "topics": [
      {
        "id": "g10-trig",
        "grade": 10,
        "stage": "high",
        "title": "Right Triangle Trigonometry (SOH-CAH-TOA)",
        "domain": "Geometric & Spatial Reasoning (GSR)",
        "standardCode": "G.GSR.6",
        "description": "Define trigonometric ratios (sine, cosine, tangent) and solve right triangle problems in navigation and astronomy.",
        "icon": "📐",
        "xpReward": 270,
        "lessons": [
          {
            "id": "g10-l1-soh-cah-toa",
            "topicId": "g10-trig",
            "grade": 10,
            "title": "SOH-CAH-TOA, Inverse Trig & Angles of Elevation",
            "standard": {
              "code": "G.GSR.6.1",
              "domain": "Geometric & Spatial Reasoning (GSR)",
              "description": "Use trigonometric ratios sin, cos, and tan and their inverses to solve right triangles in applied problems.",
              "grade": 10
            },
            "objectives": [
              "Define $\\sin\\theta = \\frac{\\text{Opp}}{\\text{Hyp}}$, $\\cos\\theta = \\frac{\\text{Adj}}{\\text{Hyp}}$, and $\\tan\\theta = \\frac{\\text{Opp}}{\\text{Adj}}$.",
              "Understand cofunction identity $\\sin(\\theta) = \\cos(90^\\circ - \\theta)$.",
              "Solve for unknown side lengths and angles of elevation/depression."
            ],
            "scenes": [
              {
                "id": "g10-l1-soh-cah-toa-s1",
                "title": "Step 1: The Three Trig Ratios (SOH-CAH-TOA)",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "Relative to acute angle θ, label the Opposite leg, Adjacent leg, and Hypotenuse!",
                "explanation": "Trigonometric ratios depend only on the angle $\\theta$, because all right triangles with angle $\\theta$ are similar.",
                "formula": "$$\\sin\\theta = \\frac{\\text{Opp}}{\\text{Hyp}}, \\qquad \\cos\\theta = \\frac{\\text{Adj}}{\\text{Hyp}}, \\qquad \\tan\\theta = \\frac{\\text{Opp}}{\\text{Adj}}$$",
                "workedExample": {
                  "problem": "In a $3\\text{-}4\\text{-}5$ right triangle, angle $\\theta$ is opposite side $3$ and adjacent to side $4$. Find $\\sin\\theta, \\cos\\theta, \\tan\\theta$.",
                  "steps": [
                    "$\\sin\\theta = \\frac{3}{5}$, $\\cos\\theta = \\frac{4}{5}$, $\\tan\\theta = \\frac{3}{4}$."
                  ],
                  "answer": "sin θ = 3/5, cos θ = 4/5, tan θ = 3/4"
                },
                "quickCheck": {
                  "question": "In a right triangle, $\\text{Opposite} = 5$, $\\text{Adjacent} = 12$, $\\text{Hypotenuse} = 13$. What is $\\tan\\theta$?",
                  "options": [
                    "5/12",
                    "5/13",
                    "12/13",
                    "12/5"
                  ],
                  "correctIndex": 0,
                  "explanation": "tan θ = Opposite / Adjacent = 5/12."
                },
                "visualType": "geometry_shapes",
                "caption": "Right triangle with labeled angle θ, Opposite, Adjacent, and Hypotenuse."
              },
              {
                "id": "g10-l1-soh-cah-toa-s2",
                "title": "Step 2: Solving for Unknown Sides & Cofunctions",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "If the hypotenuse is 20 and θ = 30°, then the opposite side is 20 · sin(30°) = 20 · (0.5) = 10!",
                "explanation": "Also notice that the side opposite $\\theta$ is adjacent to $(90^\\circ - \\theta)$, so $\\sin(\\theta) = \\cos(90^\\circ - \\theta)$.",
                "formula": "$$\\text{Opp} = \\text{Hyp} \\cdot \\sin\\theta, \\qquad \\sin(\\theta) = \\cos(90^\\circ - \\theta)$$",
                "workedExample": {
                  "problem": "If $\\sin(25^\\circ) \\approx 0.423$, what angle $x$ satisfies $\\cos(x) = \\sin(25^\\circ)$?",
                  "steps": [
                    "Use cofunction identity: $x = 90^\\circ - 25^\\circ = 65^\\circ$."
                  ],
                  "answer": "65°"
                },
                "quickCheck": {
                  "question": "In a $45^\\circ\\text{-}45^\\circ\\text{-}90^\\circ$ right triangle, what is $\\tan(45^\\circ)$?",
                  "options": [
                    "1",
                    "0",
                    "1/2",
                    "√3"
                  ],
                  "correctIndex": 0,
                  "explanation": "The opposite and adjacent legs are equal, so Opp/Adj = 1."
                },
                "visualType": "geometry_shapes",
                "caption": "Complementary angles in a right triangle."
              },
              {
                "id": "g10-l1-soh-cah-toa-s3",
                "title": "Step 3: Inverse Trig & Angles of Elevation",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "To find the angle θ when you know the sides, apply the inverse trig function: θ = tan⁻¹(Opp / Adj)!",
                "explanation": "Angle of elevation is measured upward from the horizontal line of sight.",
                "formula": "$$\\theta = \\sin^{-1}\\!\\left(\\frac{O}{H}\\right) = \\cos^{-1}\\!\\left(\\frac{A}{H}\\right) = \\tan^{-1}\\!\\left(\\frac{O}{A}\\right)$$",
                "workedExample": {
                  "problem": "A tower casts a 40 m shadow when the tower height is 40 m. Find the sun's angle of elevation $\\theta$.",
                  "steps": [
                    "$\\tan\\theta = \\frac{40}{40} = 1$.",
                    "$\\theta = \\tan^{-1}(1) = 45^\\circ$."
                  ],
                  "answer": "45°"
                },
                "quickCheck": {
                  "question": "If $\\sin\\theta = \\frac{1}{2}$ for acute angle $\\theta$, what is $\\theta$?",
                  "options": [
                    "30°",
                    "60°",
                    "45°",
                    "90°"
                  ],
                  "correctIndex": 0,
                  "explanation": "sin(30°) = 1/2 in a 30°-60°-90° triangle."
                },
                "visualType": "geometry_shapes",
                "caption": "Angle of elevation triangulation."
              }
            ],
            "takeaways": [
              "**SOH-CAH-TOA**: $\\sin = \\frac{O}{H}$, $\\cos = \\frac{A}{H}$, $\\tan = \\frac{O}{A}$.",
              "For complementary angles $A + B = 90^\\circ$, $\\sin A = \\cos B$.",
              "Use inverse trig ($\\sin^{-1}, \\cos^{-1}, \\tan^{-1}$) to find an unknown angle from a side ratio."
            ],
            "quiz": {
              "topic": "Right Triangle Trigonometry (SOH-CAH-TOA)",
              "questions": [
                {
                  "question": "In a right triangle with angle $\\theta$, what is $\\sin(\\theta)$?",
                  "options": [
                    "$\\frac{\\text{Opposite}}{\\text{Hypotenuse}}$",
                    "$\\frac{\\text{Adjacent}}{\\text{Hypotenuse}}$",
                    "$\\frac{\\text{Opposite}}{\\text{Adjacent}}$",
                    "$\\frac{\\text{Hypotenuse}}{\\text{Opposite}}$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "SOH: Sine = Opposite / Hypotenuse."
                },
                {
                  "question": "If $\\tan(\\theta) = 1$ in a right triangle, what is acute angle $\\theta$?",
                  "options": [
                    "$45^\\circ$",
                    "$30^\\circ$",
                    "$60^\\circ$",
                    "$90^\\circ$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "Opposite equals Adjacent at $45^\\circ$."
                },
                {
                  "question": "If $\\sin(40^\\circ) = \\cos(x)$, what is $x$?",
                  "options": [
                    "$50^\\circ$",
                    "$40^\\circ$",
                    "$140^\\circ$",
                    "$60^\\circ$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "Complementary angles: $90^\\circ - 40^\\circ = 50^\\circ$."
                }
              ]
            },
            "xpReward": 270
          }
        ]
      },
      {
        "id": "g10-transformations-congruence",
        "grade": 10,
        "stage": "high",
        "title": "Rigid Transformations & Triangle Congruence",
        "domain": "Geometric & Spatial Reasoning (GSR)",
        "standardCode": "G.GSR.3",
        "description": "Perform translations, reflections, and rotations in the coordinate plane and prove triangle congruence (SSS, SAS, ASA, AAS, HL).",
        "icon": "🔄",
        "xpReward": 270,
        "lessons": [
          {
            "id": "g10-l2-congruence",
            "topicId": "g10-transformations-congruence",
            "grade": 10,
            "title": "Coordinate Transformations & Congruence Postulates",
            "standard": {
              "code": "G.GSR.3.1",
              "domain": "Geometric & Spatial Reasoning (GSR)",
              "description": "Use rigid motions to establish triangle congruence criteria (SSS, SAS, ASA, AAS, HL).",
              "grade": 10
            },
            "objectives": [
              "Apply coordinate rules for translations, reflections, and $90^\\circ/180^\\circ$ rotations.",
              "Recognize that rigid motions preserve side lengths and angle measures.",
              "Prove triangles congruent using SSS, SAS, ASA, AAS, and HL."
            ],
            "scenes": [
              {
                "id": "g10-l2-congruence-s1",
                "title": "Step 1: Translations, Reflections & Rotations",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "Rigid motions slide, flip, or turn a shape without changing its size or angles!",
                "explanation": "- Translation by $(a, b)$: $(x, y) \\to (x+a, y+b)$\n- Reflection across y-axis: $(x, y) \\to (-x, y)$\n- $90^\\circ$ CCW Rotation: $(x, y) \\to (-y, x)$",
                "formula": "$$\\text{Reflect x-axis: } (x, -y) \\quad | \\quad \\text{Reflect y-axis: } (-x, y) \\quad | \\quad 180^\\circ\\text{ Rot: } (-x, -y)$$",
                "workedExample": {
                  "problem": "Reflect the point $(3, -5)$ across the y-axis, then translate up 4 units.",
                  "steps": [
                    "Reflect across y-axis (negate $x$): $(-3, -5)$.",
                    "Translate up 4 (add 4 to $y$): $(-3, -1)$."
                  ],
                  "answer": "(-3, -1)"
                },
                "quickCheck": {
                  "question": "What is the image of $(4, 2)$ after a $180^\\circ$ rotation about the origin?",
                  "options": [
                    "(-4, -2)",
                    "(-2, 4)",
                    "(4, -2)",
                    "(-4, 2)"
                  ],
                  "correctIndex": 0,
                  "explanation": "(x, y) -> (-x, -y) gives (-4, -2)."
                },
                "visualType": "geometry_shapes",
                "caption": "Rigid coordinate transformations."
              },
              {
                "id": "g10-l2-congruence-s2",
                "title": "Step 2: Triangle Congruence Criteria (SSS, SAS, ASA, AAS, HL)",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "You don't need to measure all 6 parts of two triangles—matching SSS, SAS, ASA, AAS, or HL guarantees they are congruent!",
                "explanation": "In **SAS**, the congruent angle must be the **included angle** right between the two congruent sides.",
                "formula": "$$\\text{Congruence: SSS, SAS, ASA, AAS, HL} \\qquad (\\text{Never SSA or AAA!})$$",
                "workedExample": {
                  "problem": "In $\\triangle ABC$ and $\\triangle DEF$, $AB = DE$, $BC = EF$, and $\\angle B = \\angle E$. Which theorem proves congruence?",
                  "steps": [
                    "Angle $B$ is between sides $AB$ and $BC$, so **SAS (Side-Angle-Side)**."
                  ],
                  "answer": "SAS"
                },
                "quickCheck": {
                  "question": "Which shortcut does NOT guarantee triangle congruence?",
                  "options": [
                    "SSA (and AAA)",
                    "SSS",
                    "ASA",
                    "HL"
                  ],
                  "correctIndex": 0,
                  "explanation": "SSA can form two different triangles (ambiguous case), and AAA only proves similarity."
                },
                "visualType": "geometry_shapes",
                "caption": "Matching congruent triangle parts."
              },
              {
                "id": "g10-l2-congruence-s3",
                "title": "Step 3: Triangle Angle Sum & Exterior Angle Theorem",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "The three interior angles of any triangle always add to 180°, and an exterior angle equals the sum of the two remote interior angles!",
                "explanation": "In an isosceles triangle, the angles opposite the congruent sides are also congruent.",
                "formula": "$$\\angle A + \\angle B + \\angle C = 180^\\circ, \\qquad \\angle_{\\text{exterior}} = \\angle A + \\angle B$$",
                "workedExample": {
                  "problem": "In $\\triangle ABC$, $\\angle A = 48^\\circ$ and $\\angle B = 62^\\circ$. Find interior $\\angle C$ and the exterior angle at $C$.",
                  "steps": [
                    "$\\angle C = 180^\\circ - (48^\\circ + 62^\\circ) = 70^\\circ$.",
                    "Exterior angle at $C = 48^\\circ + 62^\\circ = 110^\\circ$."
                  ],
                  "answer": "∠C = 70°, Exterior = 110°"
                },
                "quickCheck": {
                  "question": "An isosceles triangle has vertex angle $40^\\circ$. What does each base angle measure?",
                  "options": [
                    "70°",
                    "40°",
                    "140°",
                    "60°"
                  ],
                  "correctIndex": 0,
                  "explanation": "(180° - 40°) / 2 = 70°."
                },
                "visualType": "geometry_shapes",
                "caption": "Triangle interior and exterior angles."
              }
            ],
            "takeaways": [
              "Rigid motions (translations, reflections, rotations) preserve distance and angle measure.",
              "$180^\\circ$ rotation around the origin: $(x, y) \\to (-x, -y)$.",
              "**SSA** and **AAA** do **not** prove triangle congruence."
            ],
            "quiz": {
              "topic": "Rigid Transformations & Triangle Congruence",
              "questions": [
                {
                  "question": "What is the image of $(-2, 5)$ reflected across the x-axis?",
                  "options": [
                    "$(-2, -5)$",
                    "$(2, 5)$",
                    "$(2, -5)$",
                    "$(5, -2)$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "Reflecting across the x-axis negates the y-coordinate."
                },
                {
                  "question": "Which criterion does NOT prove two triangles congruent?",
                  "options": [
                    "AAA",
                    "SSS",
                    "SAS",
                    "ASA"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "AAA proves similarity, not congruence."
                },
                {
                  "question": "Two angles of a triangle are $55^\\circ$ and $65^\\circ$. What is the third angle?",
                  "options": [
                    "$60^\\circ$",
                    "$70^\\circ$",
                    "$50^\\circ$",
                    "$120^\\circ$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$180^\\circ - 120^\\circ = 60^\\circ$."
                }
              ]
            },
            "xpReward": 270
          }
        ]
      },
      {
        "id": "g10-similarity-dilations",
        "grade": 10,
        "stage": "high",
        "title": "Similarity, Dilations & Proportional Theorems",
        "domain": "Geometric & Spatial Reasoning (GSR)",
        "standardCode": "G.GSR.5",
        "description": "Perform dilations with scale factor $k$, prove triangles similar by AA~, SAS~, and SSS~, and solve proportional length problems.",
        "icon": "🔍",
        "xpReward": 275,
        "lessons": [
          {
            "id": "g10-l3-similarity",
            "topicId": "g10-similarity-dilations",
            "grade": 10,
            "title": "Dilations, AA Similarity & Triangle Proportionality",
            "standard": {
              "code": "G.GSR.5.1",
              "domain": "Geometric & Spatial Reasoning (GSR)",
              "description": "Use dilations and similarity criteria (AA~, SAS~, SSS~) to solve geometric problems.",
              "grade": 10
            },
            "objectives": [
              "Apply dilation rule $(x, y) \\to (kx, ky)$ centered at the origin.",
              "Prove triangles similar using AA~, SAS~, and SSS~.",
              "Understand that if scale factor is $k$, perimeter scales by $k$ and area scales by $k^2$."
            ],
            "scenes": [
              {
                "id": "g10-l3-similarity-s1",
                "title": "Step 1: Dilations & Scale Factor k",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "A dilation scales every coordinate by factor k: if k > 1 it enlarges the figure; if 0 < k < 1 it shrinks it!",
                "explanation": "Dilations preserve angle measures (shape), creating a **similar** figure.",
                "formula": "$$D_k(x, y) = (kx, ky)$$",
                "workedExample": {
                  "problem": "Dilate $P(4, -6)$ by scale factor $k = \\frac{3}{2}$ centered at the origin.",
                  "steps": [
                    "Multiply both coordinates by $1.5$: $(4 \\times 1.5, -6 \\times 1.5) = (6, -9)$."
                  ],
                  "answer": "(6, -9)"
                },
                "quickCheck": {
                  "question": "A segment of length $8$ is dilated by scale factor $k = 3$. What is the new length?",
                  "options": [
                    "24",
                    "11",
                    "8/3",
                    "64"
                  ],
                  "correctIndex": 0,
                  "explanation": "8 × 3 = 24."
                },
                "visualType": "geometry_shapes",
                "caption": "Dilation from center by scale factor k."
              },
              {
                "id": "g10-l3-similarity-s2",
                "title": "Step 2: Proving Triangles Similar (AA~, SAS~, SSS~)",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "If two angles of one triangle match two angles of another triangle (AA~), the triangles are automatically similar!",
                "explanation": "Once triangles are similar, set up a proportion of corresponding sides to solve for unknowns.",
                "formula": "$$\\triangle ABC \\sim \\triangle DEF \\implies \\frac{AB}{DE} = \\frac{BC}{EF} = \\frac{AC}{DF} = k$$",
                "workedExample": {
                  "problem": "A 6 ft person casts a 4 ft shadow at the same time a flagpole casts a 20 ft shadow. How tall is the flagpole?",
                  "steps": [
                    "Set up proportion: $\\frac{h}{6} = \\frac{20}{4} = 5$.",
                    "Multiply by 6: $h = 30\\text{ ft}$."
                  ],
                  "answer": "30 ft"
                },
                "quickCheck": {
                  "question": "If $\\triangle ABC \\sim \\triangle XYZ$ with $AB = 4, XY = 12,$ and $BC = 5$, what is $YZ$?",
                  "options": [
                    "15",
                    "20",
                    "13",
                    "60"
                  ],
                  "correctIndex": 0,
                  "explanation": "Scale factor is 12/4 = 3, so YZ = 5 × 3 = 15."
                },
                "visualType": "geometry_shapes",
                "caption": "Similar triangles shadow proportion."
              },
              {
                "id": "g10-l3-similarity-s3",
                "title": "Step 3: Side Ratio (k) vs. Area Ratio (k²)",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "When you double the side lengths of a triangle (k = 2), its area grows by 2² = 4 times!",
                "explanation": "Perimeter scales by $k$, Area scales by $k^2$, and 3D Volume scales by $k^3$.",
                "formula": "$$\\text{Side Ratio} = k \\implies \\text{Area Ratio} = k^2, \\quad \\text{Volume Ratio} = k^3$$",
                "workedExample": {
                  "problem": "Two similar triangles have a side ratio of $3:5$. What is the ratio of their areas?",
                  "steps": [
                    "Square both terms: $3^2 : 5^2 = 9:25$."
                  ],
                  "answer": "9:25"
                },
                "quickCheck": {
                  "question": "If the sides of a polygon are tripled ($k = 3$), its area is multiplied by...",
                  "options": [
                    "9",
                    "3",
                    "6",
                    "27"
                  ],
                  "correctIndex": 0,
                  "explanation": "Area scales by k² = 3² = 9."
                },
                "visualType": "geometry_shapes",
                "caption": "Quadratic scaling of area under dilation."
              }
            ],
            "takeaways": [
              "Similar figures have **congruent angles** and **proportional corresponding sides**.",
              "Two matching angles (**AA~**) are enough to prove two triangles similar.",
              "If side ratio is $k$, then **Area Ratio $= k^2$** and **Volume Ratio $= k^3$**."
            ],
            "quiz": {
              "topic": "Similarity, Dilations & Proportional Theorems",
              "questions": [
                {
                  "question": "What is the image of $(6, -4)$ under a dilation of scale factor $k = \\frac{1}{2}$?",
                  "options": [
                    "$(3, -2)$",
                    "$(12, -8)$",
                    "$(3, -4)$",
                    "$(6.5, -3.5)$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "Multiply each coordinate by $1/2$."
                },
                {
                  "question": "Which criterion proves two triangles are similar?",
                  "options": [
                    "AA~ (Angle-Angle)",
                    "SSA",
                    "AAA Congruence",
                    "HL only"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "Two congruent angles guarantee similarity."
                },
                {
                  "question": "Two similar rectangles have side ratio $2:3$. What is their area ratio?",
                  "options": [
                    "$4:9$",
                    "$2:3$",
                    "$8:27$",
                    "$4:6$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$2^2 : 3^2 = 4:9$."
                }
              ]
            },
            "xpReward": 275
          }
        ]
      },
      {
        "id": "g10-circles-3d-volume",
        "grade": 10,
        "stage": "high",
        "title": "Circle Theorems, Sectors, Equations & 3D Volume",
        "domain": "Geometric & Spatial Reasoning (GSR)",
        "standardCode": "G.GSR.8",
        "description": "Apply inscribed and central angle theorems, arc length & sector area, circle equation $(x-h)^2+(y-k)^2=r^2$, and 3D volume.",
        "icon": "🌐",
        "xpReward": 275,
        "lessons": [
          {
            "id": "g10-l4-circles-volume",
            "topicId": "g10-circles-3d-volume",
            "grade": 10,
            "title": "Inscribed Angles, Sector Area, Circle Equations & 3D Volume",
            "standard": {
              "code": "G.GSR.8.1",
              "domain": "Geometric & Spatial Reasoning (GSR)",
              "description": "Apply circle theorems, write equations of circles, and compute volumes of cylinders, cones, pyramids, and spheres.",
              "grade": 10
            },
            "objectives": [
              "Relate central angles ($\\theta$) and inscribed angles ($\\frac{1}{2}\\theta$) to intercepted arcs.",
              "Compute Arc Length and Sector Area as fractions $\\frac{\\theta}{360^\\circ}$ of a circle.",
              "Use $(x-h)^2 + (y-k)^2 = r^2$ and 3D volume formulas ($V_{\\text{cone}} = \\frac{1}{3}\\pi r^2 h$, $V_{\\text{sphere}} = \\frac{4}{3}\\pi r^3$)."
            ],
            "scenes": [
              {
                "id": "g10-l4-circles-volume-s1",
                "title": "Step 1: Central Angles, Inscribed Angles & Arcs",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "A central angle equals its intercepted arc, while an inscribed angle with its vertex on the circle is exactly HALF the intercepted arc!",
                "explanation": "An angle inscribed in a semicircle ($180^\\circ$ arc) is always a $90^\\circ$ right angle!",
                "formula": "$$\\theta_{\\text{central}} = \\text{Arc}, \\qquad \\theta_{\\text{inscribed}} = \\frac{1}{2}\\text{Arc}$$",
                "workedExample": {
                  "problem": "An inscribed angle intercepts an arc of $84^\\circ$. What does the inscribed angle measure?",
                  "steps": [
                    "$\\frac{1}{2} \\times 84^\\circ = 42^\\circ$."
                  ],
                  "answer": "42°"
                },
                "quickCheck": {
                  "question": "If an inscribed angle measures $35^\\circ$, what is the measure of its intercepted arc?",
                  "options": [
                    "70°",
                    "35°",
                    "17.5°",
                    "145°"
                  ],
                  "correctIndex": 0,
                  "explanation": "Arc = 2 × 35° = 70°."
                },
                "visualType": "geometry_shapes",
                "caption": "Central vs. inscribed angles in a circle."
              },
              {
                "id": "g10-l4-circles-volume-s2",
                "title": "Step 2: Equation of a Circle & Sector Area",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "By the Pythagorean Theorem, every point (x, y) on a circle of radius r centered at (h, k) satisfies (x - h)² + (y - k)² = r²!",
                "explanation": "Be careful to flip the signs inside $(x - h)$ and $(y - k)$ when reading the center $(h, k)$.",
                "formula": "$$(x - h)^2 + (y - k)^2 = r^2, \\qquad A_{\\text{sector}} = \\frac{\\theta}{360^\\circ}\\pi r^2$$",
                "workedExample": {
                  "problem": "Find the center and radius of $(x - 3)^2 + (y + 5)^2 = 49$.",
                  "steps": [
                    "$h = 3, k = -5 \\implies \\text{Center } (3, -5)$.",
                    "$r = \\sqrt{49} = 7$."
                  ],
                  "answer": "Center (3, -5), r = 7"
                },
                "quickCheck": {
                  "question": "What is the area of a $90^\\circ$ sector in a circle of radius $6$?",
                  "options": [
                    "9π",
                    "36π",
                    "6π",
                    "18π"
                  ],
                  "correctIndex": 0,
                  "explanation": "(90/360) × π(6)² = (1/4)(36π) = 9π."
                },
                "visualType": "geometry_shapes",
                "caption": "Coordinate circle and sector slice."
              },
              {
                "id": "g10-l4-circles-volume-s3",
                "title": "Step 3: Volume of Cylinders, Cones, Pyramids & Spheres",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "A cylinder has volume V = πr²h, while a cone with the exact same radius and height has exactly 1/3 of that volume!",
                "explanation": "Cavalieri's Principle shows that slanted cylinders/prisms have the same volume as right ones if cross-sectional areas match.",
                "formula": "$$V_{\\text{cyl}} = \\pi r^2 h, \\quad V_{\\text{cone}} = \\frac{1}{3}\\pi r^2 h, \\quad V_{\\text{sphere}} = \\frac{4}{3}\\pi r^3$$",
                "workedExample": {
                  "problem": "Find the volume of a cone with radius $r = 3\\text{ cm}$ and height $h = 10\\text{ cm}$.",
                  "steps": [
                    "$V = \\frac{1}{3}\\pi (3)^2 (10) = \\frac{1}{3}\\pi (90) = 30\\pi\\text{ cm}^3$."
                  ],
                  "answer": "30π cm³"
                },
                "quickCheck": {
                  "question": "A cylinder has volume $60\\text{ m}^3$. What is the volume of a cone with the same radius and height?",
                  "options": [
                    "20 m³",
                    "60 m³",
                    "180 m³",
                    "30 m³"
                  ],
                  "correctIndex": 0,
                  "explanation": "A cone has 1/3 the volume of the cylinder: 60 / 3 = 20 m³."
                },
                "visualType": "geometry_shapes",
                "caption": "Comparing cylinder, cone, and sphere volumes."
              }
            ],
            "takeaways": [
              "An **inscribed angle** is half its intercepted arc ($\\angle_{\\text{inscribed}} = \\frac{1}{2}\\text{Arc}$).",
              "Circle with center $(h, k)$ and radius $r$: $(x - h)^2 + (y - k)^2 = r^2$.",
              "A cone or pyramid has $\\frac{1}{3}$ the volume of a cylinder/prism with the same base and height."
            ],
            "quiz": {
              "topic": "Circle Theorems, Sectors, Equations & 3D Volume",
              "questions": [
                {
                  "question": "What is the center and radius of $(x + 2)^2 + (y - 4)^2 = 25$?",
                  "options": [
                    "Center $(-2, 4)$, radius $5$",
                    "Center $(2, -4)$, radius $5$",
                    "Center $(-2, 4)$, radius $25$",
                    "Center $(2, -4)$, radius $25$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$h=-2, k=4, r=\\sqrt{25}=5$."
                },
                {
                  "question": "An inscribed angle intercepts a $100^\\circ$ arc. What is the angle's measure?",
                  "options": [
                    "$50^\\circ$",
                    "$100^\\circ$",
                    "$200^\\circ$",
                    "$80^\\circ$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "Half of $100^\\circ$ is $50^\\circ$."
                },
                {
                  "question": "What is the volume of a cylinder with $r = 4$ and $h = 5$?",
                  "options": [
                    "$80\\pi$",
                    "$20\\pi$",
                    "$40\\pi$",
                    "$100\\pi$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$\\pi(4)^2(5) = 80\\pi$."
                }
              ]
            },
            "xpReward": 275
          }
        ]
      }
    ]
  },
  {
    "grade": 11,
    "gradeName": "Grade 11 — Advanced Algebra & Precalculus",
    "stage": "high",
    "description": "Unit circle trigonometry & radians, logarithms & exponentials, polynomials & rational functions, vectors & trig identities.",
    "topics": [
      {
        "id": "g11-unit-circle",
        "grade": 11,
        "stage": "high",
        "title": "The Unit Circle, Radians & Periodic Functions",
        "domain": "Trigonometry & Functions (TR)",
        "standardCode": "PC.TR.1",
        "description": "Convert between degrees and radians, locate exact $(\\cos\\theta, \\sin\\theta)$ coordinates on the unit circle, and model sinusoidal waves.",
        "icon": "⚪",
        "xpReward": 300,
        "lessons": [
          {
            "id": "g11-l1-unit-circle-rad",
            "topicId": "g11-unit-circle",
            "grade": 11,
            "title": "Orbital Radians, The Unit Circle & Sinusoidal Waves",
            "standard": {
              "code": "PC.TR.1.1",
              "domain": "Trigonometry & Functions (TR)",
              "description": "Convert degrees and radians, evaluate exact trigonometric values on the unit circle, and analyze y = A sin(Bx) + D.",
              "grade": 11
            },
            "objectives": [
              "Understand $2\\pi\\text{ radians} = 360^\\circ$ and $\\pi\\text{ radians} = 180^\\circ$.",
              "Locate exact $(\\cos\\theta, \\sin\\theta)$ coordinates at special angles ($\\frac{\\pi}{6}, \\frac{\\pi}{4}, \\frac{\\pi}{3}, \\frac{\\pi}{2}$).",
              "Determine amplitude $|A|$, period $\\frac{2\\pi}{B}$, and midline $y = D$ of trig graphs."
            ],
            "scenes": [
              {
                "id": "g11-l1-unit-circle-rad-s1",
                "title": "Step 1: Radians & Degree Conversion",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "One radian is the angle where the arc length equals the radius r! A full circle is 2π radians (360°), and a half circle is π radians (180°).",
                "explanation": "Use the conversion factor $\\frac{\\pi\\text{ rad}}{180^\\circ}$ to convert degrees to radians.",
                "formula": "$$180^\\circ = \\pi\\text{ radians} \\implies \\theta_{\\text{rad}} = \\theta_{\\text{deg}} \\cdot \\frac{\\pi}{180^\\circ}$$",
                "workedExample": {
                  "problem": "Convert $60^\\circ$ and $135^\\circ$ to radians.",
                  "steps": [
                    "$60^\\circ \\cdot \\frac{\\pi}{180^\\circ} = \\frac{\\pi}{3}$.",
                    "$135^\\circ \\cdot \\frac{\\pi}{180^\\circ} = \\frac{3\\pi}{4}$."
                  ],
                  "answer": "π/3 and 3π/4"
                },
                "quickCheck": {
                  "question": "What is $\\frac{\\pi}{6}$ radians in degrees?",
                  "options": [
                    "30°",
                    "60°",
                    "45°",
                    "15°"
                  ],
                  "correctIndex": 0,
                  "explanation": "180° / 6 = 30°."
                },
                "visualType": "geometry_shapes",
                "caption": "Unit circle showing radians and degrees."
              },
              {
                "id": "g11-l1-unit-circle-rad-s2",
                "title": "Step 2: Exact Coordinates (cos θ, sin θ) on the Unit Circle",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "On a circle of radius 1, the x-coordinate of any point is cos θ and the y-coordinate is sin θ!",
                "explanation": "- At $\\frac{\\pi}{6}$ ($30^\\circ$): $(\\frac{\\sqrt{3}}{2}, \\frac{1}{2})$\n- At $\\frac{\\pi}{4}$ ($45^\\circ$): $(\\frac{\\sqrt{2}}{2}, \\frac{\\sqrt{2}}{2})$\n- At $\\frac{\\pi}{3}$ ($60^\\circ$): $(\\frac{1}{2}, \\frac{\\sqrt{3}}{2})$",
                "formula": "$$(x, y) = (\\cos\\theta, \\sin\\theta), \\qquad \\cos^2\\theta + \\sin^2\\theta = 1$$",
                "workedExample": {
                  "problem": "Find the exact values of $\\cos(\\frac{\\pi}{3})$ and $\\sin(\\frac{\\pi}{3})$.",
                  "steps": [
                    "At $60^\\circ$ ($\\frac{\\pi}{3}$), the point is $(\\frac{1}{2}, \\frac{\\sqrt{3}}{2})$.",
                    "So $\\cos(\\frac{\\pi}{3}) = \\frac{1}{2}$ and $\\sin(\\frac{\\pi}{3}) = \\frac{\\sqrt{3}}{2}$."
                  ],
                  "answer": "cos(π/3) = 1/2, sin(π/3) = √3/2"
                },
                "quickCheck": {
                  "question": "What is the exact value of $\\sin(\\frac{\\pi}{2})$?",
                  "options": [
                    "1",
                    "0",
                    "-1",
                    "√2/2"
                  ],
                  "correctIndex": 0,
                  "explanation": "At π/2 (90°), the point on the unit circle is (0, 1), so y = sin(π/2) = 1."
                },
                "visualType": "geometry_shapes",
                "caption": "Special angle coordinates on the unit circle."
              },
              {
                "id": "g11-l1-unit-circle-rad-s3",
                "title": "Step 3: Amplitude & Period of Sinusoidal Waves",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "Unwrapping the unit circle over time creates a smooth wave: y = A sin(Bx) + D!",
                "explanation": "- **Amplitude $|A|$**: half the distance from wave peak to trough.\n- **Period $\\frac{2\\pi}{|B|}$**: horizontal length of 1 full cycle.",
                "formula": "$$y = A\\sin(Bx) + D \\implies \\text{Amplitude} = |A|, \\quad \\text{Period} = \\frac{2\\pi}{|B|}$$",
                "workedExample": {
                  "problem": "Find the amplitude and period of $y = 4\\sin(2x) + 1$.",
                  "steps": [
                    "Amplitude $= |4| = 4$.",
                    "Period $= \\frac{2\\pi}{2} = \\pi$."
                  ],
                  "answer": "Amplitude = 4, Period = π"
                },
                "quickCheck": {
                  "question": "What is the amplitude of $y = -3\\cos(x)$?",
                  "options": [
                    "3",
                    "-3",
                    "2π",
                    "1"
                  ],
                  "correctIndex": 0,
                  "explanation": "Amplitude is always non-negative: |-3| = 3."
                },
                "visualType": "riemann_sum",
                "caption": "Periodic wave parameters."
              }
            ],
            "takeaways": [
              "To convert degrees $\\to$ radians, multiply by $\\frac{\\pi}{180^\\circ}$.",
              "On the unit circle ($r = 1$), $(x, y) = (\\cos\\theta, \\sin\\theta)$ and $\\cos^2\\theta + \\sin^2\\theta = 1$.",
              "For $y = A\\sin(Bx) + D$, Amplitude $= |A|$ and Period $= \\frac{2\\pi}{|B|}$."
            ],
            "quiz": {
              "topic": "The Unit Circle, Radians & Periodic Functions",
              "questions": [
                {
                  "question": "What is $180^\\circ$ expressed in radians?",
                  "options": [
                    "$\\pi$",
                    "$2\\pi$",
                    "$\\frac{\\pi}{2}$",
                    "$\\frac{3\\pi}{2}$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$180^\\circ = \\pi$ radians."
                },
                {
                  "question": "What is the exact value of $\\cos(0)$ on the unit circle?",
                  "options": [
                    "1",
                    "0",
                    "-1",
                    "undefined"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "At angle 0, the point is $(1, 0)$, so $\\cos(0) = 1$."
                },
                {
                  "question": "What is the period of $y = 5\\sin(4x)$?",
                  "options": [
                    "$\\frac{\\pi}{2}$",
                    "$2\\pi$",
                    "$4\\pi$",
                    "$5$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$\\frac{2\\pi}{4} = \\frac{\\pi}{2}$."
                }
              ]
            },
            "xpReward": 300
          }
        ]
      },
      {
        "id": "g11-logarithms",
        "grade": 11,
        "stage": "high",
        "title": "Logarithmic & Exponential Functions ($\\log_b x, \\ln x$)",
        "domain": "Functional & Graphical Reasoning (FGR)",
        "standardCode": "AA.FGR.3",
        "description": "Understand logarithms as inverse exponents, apply log laws, and solve exponential and logarithmic equations.",
        "icon": "📈",
        "xpReward": 300,
        "lessons": [
          {
            "id": "g11-l2-logarithms",
            "topicId": "g11-logarithms",
            "grade": 11,
            "title": "Logarithm Properties & Solving Exponential Equations",
            "standard": {
              "code": "AA.FGR.3.1",
              "domain": "Functional & Graphical Reasoning (FGR)",
              "description": "Convert between exponential and logarithmic forms, apply logarithm laws, and solve exponential equations.",
              "grade": 11
            },
            "objectives": [
              "Convert between $b^y = x$ and $\\log_b(x) = y$.",
              "Apply Product, Quotient, and Power laws of logarithms.",
              "Solve exponential equations using $\\ln(x)$ or common $\\log(x)$."
            ],
            "scenes": [
              {
                "id": "g11-l2-logarithms-s1",
                "title": "Step 1: Logarithms as Inverse Exponents",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "log₂(8) asks: 2 raised to WHAT power equals 8? Since 2³ = 8, log₂(8) = 3!",
                "explanation": "A logarithm is simply the exponent to which you raise the base $b$ to obtain $x$.",
                "formula": "$$\\log_b(x) = y \\iff b^y = x$$",
                "workedExample": {
                  "problem": "Evaluate $\\log_3(81)$ and $\\log_{10}(0.01)$.",
                  "steps": [
                    "Since $3^4 = 81$, $\\log_3(81) = 4$.",
                    "Since $10^{-2} = 0.01$, $\\log_{10}(0.01) = -2$."
                  ],
                  "answer": "4 and -2"
                },
                "quickCheck": {
                  "question": "What is $\\log_5(25)$?",
                  "options": [
                    "2",
                    "5",
                    "125",
                    "1/2"
                  ],
                  "correctIndex": 0,
                  "explanation": "5² = 25, so log₅(25) = 2."
                },
                "visualType": "riemann_sum",
                "caption": "Inverse reflection of b^x and log_b(x) across y = x."
              },
              {
                "id": "g11-l2-logarithms-s2",
                "title": "Step 2: Product, Quotient & Power Laws of Logarithms",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "Because logarithms are exponents, multiplying inside a log turns into ADDING logs, and exponents pull down in front!",
                "explanation": "- Product Rule: $\\log_b(MN) = \\log_b M + \\log_b N$\n- Quotient Rule: $\\log_b(M/N) = \\log_b M - \\log_b N$\n- Power Rule: $\\log_b(M^k) = k\\log_b M$",
                "formula": "$$\\log_b(M^k) = k\\log_b(M)$$",
                "workedExample": {
                  "problem": "Condense $2\\ln(x) + \\ln(y)$ into a single logarithm.",
                  "steps": [
                    "Use Power Rule: $2\\ln(x) = \\ln(x^2)$.",
                    "Use Product Rule: $\\ln(x^2) + \\ln(y) = \\ln(x^2 y)$."
                  ],
                  "answer": "ln(x²y)"
                },
                "quickCheck": {
                  "question": "What does $\\log_2(4) + \\log_2(8)$ equal?",
                  "options": [
                    "5 (since log₂(32) = 5)",
                    "12",
                    "6",
                    "32"
                  ],
                  "correctIndex": 0,
                  "explanation": "2 + 3 = 5."
                },
                "visualType": "linear_trajectory",
                "caption": "Logarithmic compression scale."
              },
              {
                "id": "g11-l2-logarithms-s3",
                "title": "Step 3: Solving Exponential Equations with Logarithms",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "To solve for an exponent in the sky like 3ˣ = 20, take the logarithm of both sides so x pulls down in front!",
                "explanation": "For base $e$ equations like $e^{2x} = 7$, apply the natural logarithm $\\ln$ to both sides.",
                "formula": "$$e^{kx} = c \\implies kx = \\ln(c) \\implies x = \\frac{\\ln(c)}{k}$$",
                "workedExample": {
                  "problem": "Solve $e^{3x} = 15$ for $x$.",
                  "steps": [
                    "Take $\\ln$ of both sides: $\\ln(e^{3x}) = \\ln(15) \\implies 3x = \\ln(15)$.",
                    "Divide by 3: $x = \\frac{\\ln(15)}{3} \\approx 0.903$."
                  ],
                  "answer": "x = ln(15) / 3"
                },
                "quickCheck": {
                  "question": "Solve $\\log_4(x) = 3$.",
                  "options": [
                    "x = 64",
                    "x = 12",
                    "x = 81",
                    "x = 7"
                  ],
                  "correctIndex": 0,
                  "explanation": "Rewrite in exponential form: x = 4³ = 64."
                },
                "visualType": "riemann_sum",
                "caption": "Solving exponential growth times."
              }
            ],
            "takeaways": [
              "$\\log_b(x) = y \\iff b^y = x$ (a logarithm is an **exponent**!).",
              "Log Laws: $\\log(AB) = \\log A + \\log B$, $\\log(A/B) = \\log A - \\log B$, $\\log(A^k) = k\\log A$.",
              "Natural log $\\ln(x) = \\log_e(x)$ is the inverse of $e^x$: $\\ln(e^x) = x$."
            ],
            "quiz": {
              "topic": "Logarithmic & Exponential Functions ($\\log_b x, \\ln x$)",
              "questions": [
                {
                  "question": "What is the inverse function of $f(x) = e^x$?",
                  "options": [
                    "$\\ln(x)$",
                    "$\\log_{10}(x)$",
                    "$\\frac{1}{e^x}$",
                    "$\\sqrt{e^x}$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "Natural logarithm $\\ln(x)$ is the inverse of $e^x$."
                },
                {
                  "question": "Evaluate $\\log_2(16)$.",
                  "options": [
                    "4",
                    "8",
                    "2",
                    "32"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$2^4 = 16$."
                },
                {
                  "question": "Which is equivalent to $\\ln(a^3 b)$?",
                  "options": [
                    "$3\\ln(a) + \\ln(b)$",
                    "$3\\ln(ab)$",
                    "$\\ln(3a) + \\ln(b)$",
                    "$3\\ln(a)\\cdot\\ln(b)$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "Product and power rules of logs."
                }
              ]
            },
            "xpReward": 300
          }
        ]
      },
      {
        "id": "g11-polynomials-rationals",
        "grade": 11,
        "stage": "high",
        "title": "Polynomials, Complex Zeros & Rational Functions",
        "domain": "Functional & Graphical Reasoning (FGR)",
        "standardCode": "AA.FGR.5",
        "description": "Analyze polynomial end behavior, factor higher-degree polynomials, apply the Fundamental Theorem of Algebra, and find asymptotes.",
        "icon": "🎢",
        "xpReward": 305,
        "lessons": [
          {
            "id": "g11-l3-poly-rational",
            "topicId": "g11-polynomials-rationals",
            "grade": 11,
            "title": "Polynomial Zeros, End Behavior & Rational Asymptotes",
            "standard": {
              "code": "AA.FGR.5.1",
              "domain": "Functional & Graphical Reasoning (FGR)",
              "description": "Find real and complex zeros of polynomials and analyze vertical and horizontal asymptotes of rational functions.",
              "grade": 11
            },
            "objectives": [
              "Determine polynomial end behavior from degree $n$ and leading coefficient $a_n$.",
              "Relate factors $(x - r)$ to roots $x = r$ and multiplicity (cross vs. bounce).",
              "Find vertical asymptotes and horizontal asymptotes of rational functions $f(x) = \\frac{P(x)}{Q(x)}$."
            ],
            "scenes": [
              {
                "id": "g11-l3-poly-rational-s1",
                "title": "Step 1: Polynomial Degree, End Behavior & Multiplicity",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "In f(x) = (x - 2)²(x + 1), the root x = 2 has even multiplicity 2 (bounces off the axis) and x = -1 has odd multiplicity 1 (crosses)!",
                "explanation": "Even degree with $a_n > 0$ rises on both ends ($\\uparrow, \\uparrow$); odd degree with $a_n > 0$ falls left and rises right ($\\downarrow, \\uparrow$).",
                "formula": "$$f(x) = a(x - r_1)^{m_1}(x - r_2)^{m_2}$$",
                "workedExample": {
                  "problem": "Find the zeros and their behavior for $f(x) = (x + 3)(x - 4)^2$.",
                  "steps": [
                    "$x = -3$ (multiplicity 1: crosses x-axis).",
                    "$x = 4$ (multiplicity 2: touches and turns around)."
                  ],
                  "answer": "x = -3 (crosses), x = 4 (bounces)"
                },
                "quickCheck": {
                  "question": "How many total roots (including complex and multiplicity) does a degree-5 polynomial have?",
                  "options": [
                    "5",
                    "4",
                    "6",
                    "At most 2"
                  ],
                  "correctIndex": 0,
                  "explanation": "By the Fundamental Theorem of Algebra, degree n has exactly n roots."
                },
                "visualType": "linear_trajectory",
                "caption": "Polynomial roots and turning points."
              },
              {
                "id": "g11-l3-poly-rational-s2",
                "title": "Step 2: Complex Numbers (i² = -1) & Conjugate Roots",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "To take the square root of a negative number, we define the imaginary unit i = √(-1) so that i² = -1!",
                "explanation": "For example, $\\sqrt{-9} = 3i$. Complex roots of polynomials with real coefficients always come in conjugate pairs $a \\pm bi$.",
                "formula": "$$i = \\sqrt{-1}, \\qquad i^2 = -1, \\qquad (a + bi)(a - bi) = a^2 + b^2$$",
                "workedExample": {
                  "problem": "Multiply $(3 + 2i)(3 - 2i)$.",
                  "steps": [
                    "Use difference of squares: $3^2 - (2i)^2 = 9 - 4i^2$.",
                    "Substitute $i^2 = -1$: $9 - 4(-1) = 9 + 4 = 13$."
                  ],
                  "answer": "13"
                },
                "quickCheck": {
                  "question": "What is $\\sqrt{-25}$ in terms of $i$?",
                  "options": [
                    "5i",
                    "-5",
                    "-5i",
                    "25i"
                  ],
                  "correctIndex": 0,
                  "explanation": "√(-25) = √25 · √(-1) = 5i."
                },
                "visualType": "linear_trajectory",
                "caption": "Complex plane (Real vs. Imaginary axes)."
              },
              {
                "id": "g11-l3-poly-rational-s3",
                "title": "Step 3: Rational Functions & Asymptotes",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "For f(x) = (2x + 1) / (x - 3), the denominator is zero at x = 3 (vertical asymptote) and the leading ratio is y = 2/1 = 2 (horizontal asymptote)!",
                "explanation": "- **Vertical Asymptote**: set denominator $= 0$ (after canceling common factors).\n- **Horizontal Asymptote** (equal degrees): ratio of leading coefficients.",
                "formula": "$$f(x) = \\frac{ax + b}{cx + d} \\implies \\text{VA: } x = -\\frac{d}{c}, \\quad \\text{HA: } y = \\frac{a}{c}$$",
                "workedExample": {
                  "problem": "Find the vertical and horizontal asymptotes of $f(x) = \\frac{3x - 5}{x + 2}$.",
                  "steps": [
                    "Set denominator $x + 2 = 0 \\implies \\text{VA: } x = -2$.",
                    "Ratio of leading coefficients: $\\text{HA: } y = \\frac{3}{1} = 3$."
                  ],
                  "answer": "VA: x = -2, HA: y = 3"
                },
                "quickCheck": {
                  "question": "Where is the vertical asymptote of $f(x) = \\frac{1}{x - 7}$?",
                  "options": [
                    "x = 7",
                    "x = -7",
                    "y = 7",
                    "x = 0"
                  ],
                  "correctIndex": 0,
                  "explanation": "Denominator x - 7 = 0 at x = 7."
                },
                "visualType": "linear_trajectory",
                "caption": "Rational function branches and asymptotes."
              }
            ],
            "takeaways": [
              "By the **Fundamental Theorem of Algebra**, a degree-$n$ polynomial has $n$ roots (counting multiplicity and complex roots).",
              "Odd multiplicity **crosses** the x-axis; even multiplicity **touches and bounces**.",
              "Vertical asymptotes occur where the simplified denominator equals $0$."
            ],
            "quiz": {
              "topic": "Polynomials, Complex Zeros & Rational Functions",
              "questions": [
                {
                  "question": "At a root of multiplicity 2, how does the polynomial graph behave?",
                  "options": [
                    "Touches the x-axis and turns around (bounces)",
                    "Crosses straight through",
                    "Has a vertical asymptote",
                    "Disappears"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "Even multiplicity bounces at the x-axis."
                },
                {
                  "question": "What is $i^2$ equal to?",
                  "options": [
                    "$-1$",
                    "$1$",
                    "$i$",
                    "$0$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "By definition, $i^2 = -1$."
                },
                {
                  "question": "What is the horizontal asymptote of $f(x) = \\frac{4x + 1}{2x - 3}$?",
                  "options": [
                    "$y = 2$",
                    "$y = 4$",
                    "$x = \\frac{3}{2}$",
                    "$y = 0$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "Ratio of leading coefficients: $4 / 2 = 2$."
                }
              ]
            },
            "xpReward": 305
          }
        ]
      },
      {
        "id": "g11-trig-identities-vectors",
        "grade": 11,
        "stage": "high",
        "title": "Trig Identities, Law of Sines/Cosines & Vectors",
        "domain": "Trigonometry & Functions (TR)",
        "standardCode": "PC.TR.3",
        "description": "Verify trigonometric identities, solve oblique triangles with the Law of Sines and Law of Cosines, and compute with vectors.",
        "icon": "🧭",
        "xpReward": 305,
        "lessons": [
          {
            "id": "g11-l4-laws-vectors",
            "topicId": "g11-trig-identities-vectors",
            "grade": 11,
            "title": "Pythagorean Identities, Law of Sines/Cosines & 2D Vectors",
            "standard": {
              "code": "PC.TR.3.1",
              "domain": "Trigonometry & Functions (TR)",
              "description": "Use trigonometric identities, solve non-right triangles, and perform vector operations.",
              "grade": 11
            },
            "objectives": [
              "Use $\\sin^2\\theta + \\cos^2\\theta = 1$ to find trig values.",
              "Apply the Law of Sines and Law of Cosines to non-right triangles.",
              "Find magnitude $||\\vec{v}|| = \\sqrt{v_x^2 + v_y^2}$ and component form of 2D vectors."
            ],
            "scenes": [
              {
                "id": "g11-l4-laws-vectors-s1",
                "title": "Step 1: Pythagorean Trigonometric Identities",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "On the unit circle, x² + y² = 1 becomes the most famous identity in trigonometry: cos²θ + sin²θ = 1!",
                "explanation": "Dividing by $\\cos^2\\theta$ gives $1 + \\tan^2\\theta = \\sec^2\\theta$.",
                "formula": "$$\\sin^2\\theta + \\cos^2\\theta = 1 \\implies \\cos\\theta = \\pm\\sqrt{1 - \\sin^2\\theta}$$",
                "workedExample": {
                  "problem": "If $\\sin\\theta = \\frac{3}{5}$ in Quadrant I, find $\\cos\\theta$.",
                  "steps": [
                    "$\\cos^2\\theta = 1 - (\\frac{3}{5})^2 = 1 - \\frac{9}{25} = \\frac{16}{25}$.",
                    "In QI, $\\cos\\theta = +\\frac{4}{5}$."
                  ],
                  "answer": "4/5"
                },
                "quickCheck": {
                  "question": "What does $5\\sin^2\\theta + 5\\cos^2\\theta$ simplify to?",
                  "options": [
                    "5",
                    "1",
                    "25",
                    "5 sin(2θ)"
                  ],
                  "correctIndex": 0,
                  "explanation": "5(sin²θ + cos²θ) = 5(1) = 5."
                },
                "visualType": "geometry_shapes",
                "caption": "Unit circle Pythagorean identity."
              },
              {
                "id": "g11-l4-laws-vectors-s2",
                "title": "Step 2: Law of Sines & Law of Cosines",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "What if a triangle does NOT have a 90° angle? Use the Law of Sines (for AAS/ASA) or Law of Cosines (for SAS/SSS)!",
                "explanation": "Notice that when $C = 90^\\circ$, $\\cos(90^\\circ) = 0$, so the Law of Cosines simplifies directly to $c^2 = a^2 + b^2$!",
                "formula": "$$\\frac{\\sin A}{a} = \\frac{\\sin B}{b}, \\qquad c^2 = a^2 + b^2 - 2ab\\cos C$$",
                "workedExample": {
                  "problem": "In $\\triangle ABC$, $a = 5, b = 8,$ and $\\angle C = 60^\\circ$. Find $c$ using the Law of Cosines ($\\cos 60^\\circ = 0.5$).",
                  "steps": [
                    "$c^2 = 5^2 + 8^2 - 2(5)(8)(0.5) = 25 + 64 - 40 = 49$.",
                    "$c = \\sqrt{49} = 7$."
                  ],
                  "answer": "c = 7"
                },
                "quickCheck": {
                  "question": "When you know all 3 sides (SSS) of a non-right triangle, which law finds an angle?",
                  "options": [
                    "Law of Cosines",
                    "Law of Sines",
                    "SOH-CAH-TOA",
                    "Area formula"
                  ],
                  "correctIndex": 0,
                  "explanation": "Law of Cosines relates all 3 sides to 1 angle."
                },
                "visualType": "geometry_shapes",
                "caption": "Oblique triangle sides and angles."
              },
              {
                "id": "g11-l4-laws-vectors-s3",
                "title": "Step 3: 2D Vectors — Magnitude & Components",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "A vector v = ⟨vx, vy⟩ has both magnitude (length) and direction! Add vectors by adding their x and y components.",
                "explanation": "Magnitude is found by the Pythagorean Theorem: $||\\vec{v}|| = \\sqrt{v_x^2 + v_y^2}$.",
                "formula": "$$\\vec{u} + \\vec{v} = \\langle u_x + v_x, u_y + v_y \\rangle, \\qquad ||\\vec{v}|| = \\sqrt{v_x^2 + v_y^2}$$",
                "workedExample": {
                  "problem": "Find $\\vec{u} + \\vec{v}$ and $||\\vec{u} + \\vec{v}||$ for $\\vec{u} = \\langle 2, 5 \\rangle$ and $\\vec{v} = \\langle 4, 3 \\rangle$.",
                  "steps": [
                    "Add components: $\\vec{u} + \\vec{v} = \\langle 2+4, 5+3 \\rangle = \\langle 6, 8 \\rangle$.",
                    "Magnitude: $\\sqrt{6^2 + 8^2} = \\sqrt{100} = 10$."
                  ],
                  "answer": "⟨6, 8⟩, magnitude = 10"
                },
                "quickCheck": {
                  "question": "What is the magnitude of vector $\\vec{v} = \\langle -3, 4 \\rangle$?",
                  "options": [
                    "5",
                    "7",
                    "1",
                    "25"
                  ],
                  "correctIndex": 0,
                  "explanation": "√((-3)² + 4²) = √(9 + 16) = 5."
                },
                "visualType": "linear_trajectory",
                "caption": "Vector addition head-to-tail."
              }
            ],
            "takeaways": [
              "Pythagorean Identity: $\\sin^2\\theta + \\cos^2\\theta = 1$.",
              "Law of Sines: $\\frac{\\sin A}{a} = \\frac{\\sin B}{b} = \\frac{\\sin C}{c}$.",
              "Law of Cosines: $c^2 = a^2 + b^2 - 2ab\\cos C$."
            ],
            "quiz": {
              "topic": "Trig Identities, Law of Sines/Cosines & Vectors",
              "questions": [
                {
                  "question": "Which identity is always true for any angle $\\theta$?",
                  "options": [
                    "$\\sin^2\\theta + \\cos^2\\theta = 1$",
                    "$\\sin\\theta + \\cos\\theta = 1$",
                    "$\\tan\\theta = \\sin\\theta\\cos\\theta$",
                    "$\\sin^2\\theta - \\cos^2\\theta = 1$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "Pythagorean identity on the unit circle."
                },
                {
                  "question": "What is $\\langle 3, -2 \\rangle + \\langle 5, 6 \\rangle$?",
                  "options": [
                    "$\\langle 8, 4 \\rangle$",
                    "$\\langle 15, -12 \\rangle$",
                    "$\\langle 2, -8 \\rangle$",
                    "$12$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "Add components: $(3+5, -2+6) = \\langle 8, 4 \\rangle$."
                },
                {
                  "question": "In $\\triangle ABC$, if $\\sin A = 0.5, a = 10,$ and $\\sin B = 0.8$, what is side $b$?",
                  "options": [
                    "16",
                    "10",
                    "8",
                    "20"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$\\frac{0.5}{10} = \\frac{0.8}{b} \\implies b = 16$."
                }
              ]
            },
            "xpReward": 305
          }
        ]
      }
    ]
  },
  {
    "grade": 12,
    "gradeName": "Grade 12 — Calculus: Limits, Derivatives & Integration",
    "stage": "high",
    "description": "Integral calculus & Riemann sums, limits & continuity, derivatives & tangent lines, optimization & differential equations.",
    "topics": [
      {
        "id": "g12-integral-calculus",
        "grade": 12,
        "stage": "high",
        "title": "Integral Calculus & Accumulation of Change",
        "domain": "Calculus: Integration (C.INT)",
        "standardCode": "C.INT.1",
        "description": "Understand the definite integral as a limit of Riemann sums representing net accumulation and the area under a curve.",
        "icon": "🌌",
        "xpReward": 350,
        "lessons": [
          {
            "id": "g12-l1-riemann-sums",
            "topicId": "g12-integral-calculus",
            "grade": 12,
            "title": "Intuitive Accumulation: Area Under a Curve & Riemann Sums",
            "standard": {
              "code": "C.INT.1.1",
              "domain": "Calculus: Integration (C.INT)",
              "description": "Approximate area under a curve using Riemann sums and evaluate definite integrals via the Fundamental Theorem of Calculus.",
              "grade": 12
            },
            "objectives": [
              "Build intuition for integration as total accumulated change (area under a rate curve).",
              "Approximate the area under $f(x)$ by slicing into $n$ thin rectangles of width $\\Delta x = \\frac{b-a}{n}$.",
              "Observe how increasing $n$ from 4 to 8 to 32 converges onto the exact continuous area.",
              "Apply the Fundamental Theorem of Calculus: $\\int_a^b f(x)\\,dx = F(b) - F(a)$."
            ],
            "scenes": [
              {
                "id": "g12-l1-riemann-sums-s1",
                "title": "Step 1: The Great Cosmic Accumulator (Area = Accumulation)",
                "conceptStep": 1,
                "totalSteps": 4,
                "narration": "Imagine your spacecraft velocity is constantly changing over time. If velocity were constant, distance would just be velocity times time. When velocity curves, total distance is the area under the velocity curve!",
                "explanation": "Whenever you graph a **rate of change** $f(t)$ (like velocity in $\\text{m/s}$) against time $t$, the **area under the curve** from $t = a$ to $t = b$ gives the total net change accumulated! We start by slicing the region into $n = 4$ rectangles of equal width $\\Delta x$.",
                "formula": "$$\\Delta x = \\frac{b - a}{n}, \\qquad \\text{Area} \\approx \\sum_{i=1}^n f(x_i)\\,\\Delta x$$",
                "workedExample": {
                  "problem": "On the interval $[0, 4]$ with $n = 4$ subintervals, find the rectangle width $\\Delta x$ and right-endpoint sum for $f(x) = \\frac{1}{2}x^2$.",
                  "steps": [
                    "Compute width: $\\Delta x = \\frac{4 - 0}{4} = 1$.",
                    "Evaluate heights at right endpoints $x = 1, 2, 3, 4$: $f(1)=0.5, f(2)=2, f(3)=4.5, f(4)=8$.",
                    "Sum areas: $(0.5 + 2 + 4.5 + 8) \\times 1 = 15.0$."
                  ],
                  "answer": "Δx = 1, Right Riemann Sum = 15.0"
                },
                "quickCheck": {
                  "question": "If the interval $[2, 10]$ is divided into $n = 4$ equal subintervals, what is the width $\\Delta x$ of each rectangle?",
                  "options": [
                    "2",
                    "4",
                    "2.5",
                    "8"
                  ],
                  "correctIndex": 0,
                  "explanation": "Δx = (b - a) / n = (10 - 2) / 4 = 8 / 4 = 2."
                },
                "visualType": "riemann_sum",
                "caption": "Step 1: Partitioning into 4 wide rectangles leaves noticeable gaps.",
                "visualConfig": {
                  "curve": "x^2",
                  "nRectangles": 4,
                  "range": [
                    0,
                    4
                  ]
                }
              },
              {
                "id": "g12-l1-riemann-sums-s2",
                "title": "Step 2: Slicing Finer — Doubling the Rectangles",
                "conceptStep": 2,
                "totalSteps": 4,
                "narration": "What happens if we slice our time intervals in half, using 8 rectangles instead of 4? Use the slider on the left to increase n to 8 or 16—watch the excess error shrink!",
                "explanation": "Doubling the number of rectangles cuts the width $\\Delta x$ in half. Notice how the triangular error triangles poking above the curve shrink dramatically as $n$ increases!",
                "formula": "$$n = 8 \\implies \\Delta x = \\frac{4 - 0}{8} = 0.5, \\qquad \\text{Error} \\to 0 \\text{ as } n \\text{ increases}$$",
                "workedExample": {
                  "problem": "Why does a Right Riemann Sum overestimate the area when $f(x)$ is strictly increasing on $[a, b]$?",
                  "steps": [
                    "On each subinterval $[x_{i-1}, x_i]$, an increasing function reaches its highest value at the right endpoint $x_i$.",
                    "Thus each rectangle's top edge sits above the curve, creating an overestimate."
                  ],
                  "answer": "The right endpoint is the maximum height on each slice."
                },
                "quickCheck": {
                  "question": "For an increasing function $f(x)$, what does a LEFT Riemann Sum produce?",
                  "options": [
                    "An underestimate (rectangles sit below the curve)",
                    "An overestimate",
                    "The exact integral for n = 4",
                    "Zero"
                  ],
                  "correctIndex": 0,
                  "explanation": "For an increasing function, the left endpoint is the minimum on each interval, so rectangles stay below the curve."
                },
                "visualType": "riemann_sum",
                "caption": "Step 2: 8 finer rectangles hug the parabolic curve much closer.",
                "visualConfig": {
                  "curve": "x^2",
                  "nRectangles": 8,
                  "range": [
                    0,
                    4
                  ]
                }
              },
              {
                "id": "g12-l1-riemann-sums-s3",
                "title": "Step 3: The Infinite Limit — Definition of the Definite Integral",
                "conceptStep": 3,
                "totalSteps": 4,
                "narration": "Now let the number of rectangles grow without bound: n → ∞! The width Δx becomes an infinitesimal sliver dx, and the discrete sigma sum becomes the smooth integral symbol ∫!",
                "explanation": "Bernhard Riemann formalized the definite integral as the limit of Riemann sums as $n \\to \\infty$. Leibniz chose the elongated **$\\int$** (from *Summa*, Latin for sum) to represent continuous summation.",
                "formula": "$$\\int_a^b f(x)\\,dx = \\lim_{n \\to \\infty} \\sum_{i=1}^n f(x_i^*)\\,\\Delta x$$",
                "workedExample": {
                  "problem": "Translate the limit $\\lim_{n \\to \\infty} \\sum_{i=1}^n (3x_i^2)\\,\\Delta x$ on $[1, 5]$ into definite integral notation.",
                  "steps": [
                    "Replace $\\lim_{n\\to\\infty}\\sum$ with $\\int_1^5$.",
                    "Replace $3x_i^2$ with $3x^2$ and $\\Delta x$ with $dx$.",
                    "Result: $\\int_1^5 3x^2\\,dx$."
                  ],
                  "answer": "∫₁⁵ 3x² dx"
                },
                "quickCheck": {
                  "question": "In the definite integral $\\int_a^b f(x)\\,dx$, what does $dx$ represent?",
                  "options": [
                    "The infinitely thin width (Δx → 0) of each vertical slice",
                    "The height of the curve",
                    "The derivative of x",
                    "A constant equal to 1"
                  ],
                  "correctIndex": 0,
                  "explanation": "dx represents the infinitesimal width coming from Δx as n → ∞."
                },
                "visualType": "riemann_sum",
                "caption": "Step 3: At n = 32, the sum converges tightly to the true area.",
                "visualConfig": {
                  "curve": "x^2",
                  "nRectangles": 32,
                  "range": [
                    0,
                    4
                  ]
                }
              },
              {
                "id": "g12-l1-riemann-sums-s4",
                "title": "Step 4: The Fundamental Theorem of Calculus (FTC)",
                "conceptStep": 4,
                "totalSteps": 4,
                "narration": "Instead of adding millions of tiny boxes by hand, the Fundamental Theorem of Calculus gives us a breathtaking shortcut: find an antiderivative F(x) where F'(x) = f(x), and compute F(b) - F(a)!",
                "explanation": "**Power Rule for Antiderivatives**: To integrate $x^p$, add $1$ to the exponent and divide by the new exponent: $\\int x^p\\,dx = \\frac{x^{p+1}}{p+1} + C$.",
                "formula": "$$\\int_a^b f(x)\\,dx = F(b) - F(a) \\quad \\text{where } F'(x) = f(x)$$",
                "workedExample": {
                  "problem": "Evaluate the exact area $\\int_0^4 \\frac{1}{2}x^2\\,dx$ using the Fundamental Theorem of Calculus.",
                  "steps": [
                    "Find the antiderivative of $\\frac{1}{2}x^2$: $F(x) = \\frac{1}{2} \\cdot \\frac{x^3}{3} = \\frac{x^3}{6}$.",
                    "Evaluate at upper bound $b=4$ and lower bound $a=0$: $F(4) - F(0) = \\frac{4^3}{6} - 0 = \\frac{64}{6} = \\frac{32}{3} \\approx 10.667$."
                  ],
                  "answer": "32/3 ≈ 10.667"
                },
                "quickCheck": {
                  "question": "Evaluate $\\int_0^3 2x\\,dx$ using the antiderivative $F(x) = x^2$.",
                  "options": [
                    "9",
                    "6",
                    "3",
                    "18"
                  ],
                  "correctIndex": 0,
                  "explanation": "F(3) - F(0) = 3² - 0² = 9."
                },
                "visualType": "riemann_sum",
                "caption": "Step 4: Fundamental Theorem of Calculus yields exact area 10.667.",
                "visualConfig": {
                  "curve": "x^2",
                  "nRectangles": 48,
                  "range": [
                    0,
                    4
                  ]
                }
              }
            ],
            "takeaways": [
              "Integration is the continuous accumulation of changing quantities.",
              "A Riemann sum approximates area by summing rectangles: $\\sum_{i=1}^n f(x_i^*)\\,\\Delta x$ where $\\Delta x = \\frac{b-a}{n}$.",
              "The definite integral is the limit of Riemann sums as $n \\to \\infty$: $\\int_a^b f(x)\\,dx$.",
              "Fundamental Theorem of Calculus: $\\int_a^b f(x)\\,dx = F(b) - F(a)$ where $F'(x) = f(x)$."
            ],
            "quiz": {
              "topic": "Integral Calculus & Accumulation of Change",
              "questions": [
                {
                  "question": "What happens to a Riemann sum approximation as $n \\to \\infty$?",
                  "options": [
                    "It converges to the exact definite integral $\\int_a^b f(x)\\,dx$",
                    "It grows to infinity",
                    "It drops to zero",
                    "It oscillates"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "As $\\Delta x \\to 0$, the sum converges to the definite integral."
                },
                {
                  "question": "If velocity is $v(t) = 3t^2$, what is the distance traveled from $t = 0$ to $t = 2$?",
                  "options": [
                    "$\\int_0^2 3t^2\\,dt = [t^3]_0^2 = 8$",
                    "$12$",
                    "$6$",
                    "$4$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "Antiderivative of $3t^2$ is $t^3$, and $2^3 - 0^3 = 8$."
                },
                {
                  "question": "In $\\sum_{i=1}^n f(x_i^*)\\,\\Delta x$, what does $f(x_i^*)$ represent?",
                  "options": [
                    "The height of the $i$-th rectangle",
                    "The width of $[a,b]$",
                    "The derivative",
                    "The total area"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$f(x_i^*)$ is the function height at sample point $x_i^*$."
                }
              ]
            },
            "xpReward": 350,
            "gameId": "game-calculus-area"
          }
        ]
      },
      {
        "id": "g12-limits-continuity",
        "grade": 12,
        "stage": "high",
        "title": "Limits & Continuity ($\\lim_{x \\to a} f(x)$)",
        "domain": "Calculus: Limits (C.LIM)",
        "standardCode": "C.LIM.1",
        "description": "Evaluate limits graphically, numerically, and algebraically (factoring, conjugates, L'Hôpital's rule), and test continuity.",
        "icon": "🎯",
        "xpReward": 350,
        "lessons": [
          {
            "id": "g12-l2-limits",
            "topicId": "g12-limits-continuity",
            "grade": 12,
            "title": "Evaluating Limits, One-Sided Limits & Continuity",
            "standard": {
              "code": "C.LIM.1.1",
              "domain": "Calculus: Limits (C.LIM)",
              "description": "Evaluate limits algebraically and graphically and apply the three-part definition of continuity.",
              "grade": 12
            },
            "objectives": [
              "Understand $\\lim_{x \\to a} f(x) = L$ as the value $f(x)$ approaches from both sides.",
              "Resolve indeterminate $\\frac{0}{0}$ limits by factoring and canceling.",
              "Verify continuity using the three conditions: $f(a)$ defined, $\\lim_{x\\to a} f(x)$ exists, and $\\lim_{x\\to a} f(x) = f(a)$."
            ],
            "scenes": [
              {
                "id": "g12-l2-limits-s1",
                "title": "Step 1: What Is a Limit? (Approaching from Left & Right)",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "A limit asks where y is HEADING as x gets infinitely close to a—even if there is a hole right at x = a!",
                "explanation": "For the two-sided limit $\\lim_{x \\to a} f(x)$ to exist, the left-hand limit ($x \\to a^-$) and right-hand limit ($x \\to a^+$) must agree.",
                "formula": "$$\\lim_{x \\to a} f(x) = L \\iff \\lim_{x \\to a^-} f(x) = \\lim_{x \\to a^+} f(x) = L$$",
                "workedExample": {
                  "problem": "Evaluate $\\lim_{x \\to 3} (2x^2 - 5)$ by direct substitution.",
                  "steps": [
                    "Since polynomials are continuous everywhere, plug in $x = 3$:",
                    "$2(3)^2 - 5 = 18 - 5 = 13$."
                  ],
                  "answer": "13"
                },
                "quickCheck": {
                  "question": "If $\\lim_{x \\to 2^-} f(x) = 4$ and $\\lim_{x \\to 2^+} f(x) = 7$, what is $\\lim_{x \\to 2} f(x)$?",
                  "options": [
                    "Does Not Exist (DNE)",
                    "5.5",
                    "4",
                    "7"
                  ],
                  "correctIndex": 0,
                  "explanation": "Because the left and right limits do not match (4 ≠ 7), the two-sided limit does not exist."
                },
                "visualType": "linear_trajectory",
                "caption": "Approaching a limit from left and right."
              },
              {
                "id": "g12-l2-limits-s2",
                "title": "Step 2: Resolving 0/0 Indeterminate Limits by Factoring",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "When plugging in x = 2 gives 0/0 in (x² - 4)/(x - 2), there is a removable hole! Factor x² - 4 as (x - 2)(x + 2) and cancel (x - 2)!",
                "explanation": "Since a limit only cares about $x \\ne a$, canceling $(x - a)$ is 100% valid.",
                "formula": "$$\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2} = \\lim_{x \\to 2} \\frac{(x - 2)(x + 2)}{x - 2} = \\lim_{x \\to 2} (x + 2) = 4$$",
                "workedExample": {
                  "problem": "Evaluate $\\lim_{x \\to 5} \\frac{x^2 - 25}{x - 5}$.",
                  "steps": [
                    "Factor numerator: $(x - 5)(x + 5)$.",
                    "Cancel $(x - 5)$ and plug in $x = 5$: $5 + 5 = 10$."
                  ],
                  "answer": "10"
                },
                "quickCheck": {
                  "question": "What is $\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}$?",
                  "options": [
                    "6",
                    "0",
                    "3",
                    "Undefined"
                  ],
                  "correctIndex": 0,
                  "explanation": "(x - 3)(x + 3)/(x - 3) = x + 3 -> 3 + 3 = 6."
                },
                "visualType": "linear_trajectory",
                "caption": "Canceling a removable discontinuity (hole)."
              },
              {
                "id": "g12-l2-limits-s3",
                "title": "Step 3: Continuity & Limits at Infinity",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "A function is continuous at x = a if you can draw it through x = a without lifting your pen: the limit exists AND equals f(a)!",
                "explanation": "For rational functions as $x \\to \\infty$, compare the highest powers of $x$ in numerator and denominator.",
                "formula": "$$\\text{Continuous at } a \\iff \\lim_{x \\to a} f(x) = f(a)$$",
                "workedExample": {
                  "problem": "Find $\\lim_{x \\to \\infty} \\frac{6x^2 + x}{2x^2 - 5}$.",
                  "steps": [
                    "Both numerator and denominator have degree $2$.",
                    "Divide leading coefficients: $\\frac{6}{2} = 3$."
                  ],
                  "answer": "3"
                },
                "quickCheck": {
                  "question": "What value of $k$ makes $f(x) = \\frac{x^2 - 1}{x - 1}$ (for $x \\ne 1$) continuous at $x = 1$ if $f(1) = k$?",
                  "options": [
                    "k = 2",
                    "k = 1",
                    "k = 0",
                    "k = -1"
                  ],
                  "correctIndex": 0,
                  "explanation": "lim (x->1) (x+1) = 2, so setting f(1) = 2 fills the hole."
                },
                "visualType": "linear_trajectory",
                "caption": "Continuity and horizontal asymptote limits."
              }
            ],
            "takeaways": [
              "A limit $\\lim_{x\\to a} f(x)$ exists if and only if the left-hand limit equals the right-hand limit ($\\lim_{x\\to a^-} f(x) = \\lim_{x\\to a^+} f(x)$).",
              "If direct substitution gives $\\frac{0}{0}$, factor and cancel the common $(x - a)$ factor.",
              "A function is **continuous at $x = a$** if $\\lim_{x \\to a} f(x) = f(a)$."
            ],
            "quiz": {
              "topic": "Limits & Continuity ($\\lim_{x \\to a} f(x)$)",
              "questions": [
                {
                  "question": "Evaluate $\\lim_{x \\to 4} \\frac{x^2 - 16}{x - 4}$.",
                  "options": [
                    "8",
                    "4",
                    "0",
                    "Does not exist"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$\\lim_{x\\to 4} (x + 4) = 8$."
                },
                {
                  "question": "When does a two-sided limit $\\lim_{x \\to a} f(x)$ exist?",
                  "options": [
                    "When the left-hand limit equals the right-hand limit",
                    "Only when $f(a) = 0$",
                    "Only for linear functions",
                    "Never"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$\\lim_{x\\to a^-} f(x) = \\lim_{x\\to a^+} f(x)$."
                },
                {
                  "question": "Evaluate $\\lim_{x \\to \\infty} \\frac{5x + 2}{x - 4}$.",
                  "options": [
                    "5",
                    "0",
                    "$-\\frac{1}{2}$",
                    "$\\infty$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "Ratio of leading coefficients: $5/1 = 5$."
                }
              ]
            },
            "xpReward": 350
          }
        ]
      },
      {
        "id": "g12-derivatives",
        "grade": 12,
        "stage": "high",
        "title": "Differential Calculus: Derivatives & Tangent Lines",
        "domain": "Calculus: Differentiation (C.DER)",
        "standardCode": "C.DER.1",
        "description": "Understand the derivative as instantaneous rate of change and tangent line slope; apply Power, Product, Quotient, and Chain Rules.",
        "icon": "⚡",
        "xpReward": 350,
        "lessons": [
          {
            "id": "g12-l3-derivatives",
            "topicId": "g12-derivatives",
            "grade": 12,
            "title": "Instantaneous Rate of Change, Power Rule & Chain Rule",
            "standard": {
              "code": "C.DER.1.1",
              "domain": "Calculus: Differentiation (C.DER)",
              "description": "Define the derivative f'(x) as a limit of difference quotients and differentiate functions using Power, Product, Quotient, and Chain rules.",
              "grade": 12
            },
            "objectives": [
              "Understand $f'(x) = \\lim_{h \\to 0} \\frac{f(x+h)-f(x)}{h}$ as the slope of the tangent line.",
              "Differentiate polynomials and roots using the Power Rule $\\frac{d}{dx}[x^n] = nx^{n-1}$.",
              "Apply the Chain Rule $\\frac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x)$ and write tangent line equations."
            ],
            "scenes": [
              {
                "id": "g12-l3-derivatives-s1",
                "title": "Step 1: From Secant Lines to Tangent Lines (Definition of Derivative)",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "Average velocity over [x, x+h] is the slope of the secant line. Letting h → 0 shrinks the interval to a single instant—giving the tangent slope f'(x)!",
                "explanation": "The derivative $f'(x)$ (or $\\frac{dy}{dx}$) gives the exact instantaneous rate of change at any point $x$.",
                "formula": "$$f'(x) = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}$$",
                "workedExample": {
                  "problem": "If a curve has $f(2) = 5$ and derivative $f'(2) = 3$, write the equation of the tangent line at $x = 2$.",
                  "steps": [
                    "Point is $(2, 5)$ and tangent slope is $m = f'(2) = 3$.",
                    "Use point-slope form: $y - 5 = 3(x - 2) \\implies y = 3x - 1$."
                  ],
                  "answer": "y = 3x - 1"
                },
                "quickCheck": {
                  "question": "What does $f'(a) = 0$ tell us geometrically about the graph of $f(x)$ at $x = a$?",
                  "options": [
                    "The tangent line is horizontal (slope = 0)",
                    "The graph crosses the x-axis",
                    "The tangent line is vertical",
                    "f(a) = 0"
                  ],
                  "correctIndex": 0,
                  "explanation": "Derivative is tangent slope, so f'(a) = 0 means a horizontal tangent line (potential peak or valley)."
                },
                "visualType": "linear_trajectory",
                "caption": "Secant lines converging to the tangent line."
              },
              {
                "id": "g12-l3-derivatives-s2",
                "title": "Step 2: The Power Rule & Basic Derivatives",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "To differentiate xⁿ, bring the exponent n down in front and subtract 1 from the exponent: d/dx [xⁿ] = n·xⁿ⁻¹!",
                "explanation": "Also remember: $\\frac{d}{dx}[e^x] = e^x$, $\\frac{d}{dx}[\\ln x] = \\frac{1}{x}$, $\\frac{d}{dx}[\\sin x] = \\cos x$, and $\\frac{d}{dx}[\\cos x] = -\\sin x$.",
                "formula": "$$\\frac{d}{dx}\\left[x^n\\right] = n x^{n-1}, \\qquad \\frac{d}{dx}[c] = 0$$",
                "workedExample": {
                  "problem": "Find the derivative $f'(x)$ of $f(x) = 4x^3 - 5x^2 + 7x - 9$.",
                  "steps": [
                    "Differentiate term-by-term: $\\frac{d}{dx}[4x^3] = 12x^2$.",
                    "$\\frac{d}{dx}[-5x^2] = -10x$, $\\frac{d}{dx}[7x] = 7$, $\\frac{d}{dx}[-9] = 0$.",
                    "$f'(x) = 12x^2 - 10x + 7$."
                  ],
                  "answer": "f'(x) = 12x² - 10x + 7"
                },
                "quickCheck": {
                  "question": "If $f(x) = x^4$, what is $f'(2)$?",
                  "options": [
                    "32",
                    "16",
                    "8",
                    "4"
                  ],
                  "correctIndex": 0,
                  "explanation": "f'(x) = 4x³, so f'(2) = 4(2)³ = 32."
                },
                "visualType": "riemann_sum",
                "caption": "Power rule differentiation."
              },
              {
                "id": "g12-l3-derivatives-s3",
                "title": "Step 3: Product, Quotient & Chain Rules",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "For a composite function f(g(x)) like (3x² + 1)⁵, the Chain Rule differentiates the outer power 5(3x² + 1)⁴ and multiplies by the inner derivative 6x!",
                "explanation": "- **Product Rule**: $(uv)' = u'v + uv'$\n- **Chain Rule**: $\\frac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x)$",
                "formula": "$$\\frac{d}{dx}\\Big[f(g(x))\\Big] = f'(g(x)) \\cdot g'(x)$$",
                "workedExample": {
                  "problem": "Differentiate $y = (x^2 + 4)^3$ using the Chain Rule.",
                  "steps": [
                    "Outer derivative: $3(x^2 + 4)^2$.",
                    "Multiply by inner derivative $\\frac{d}{dx}[x^2 + 4] = 2x$.",
                    "Result: $y' = 6x(x^2 + 4)^2$."
                  ],
                  "answer": "6x(x² + 4)²"
                },
                "quickCheck": {
                  "question": "What is the derivative of $y = \\sin(3x)$?",
                  "options": [
                    "3 cos(3x)",
                    "cos(3x)",
                    "-3 cos(3x)",
                    "3 sin(3x)"
                  ],
                  "correctIndex": 0,
                  "explanation": "Derivative of sin(u) is cos(u) times u' = 3."
                },
                "visualType": "riemann_sum",
                "caption": "Chain rule rate multiplication."
              }
            ],
            "takeaways": [
              "**Derivative $f'(x)$** is the instantaneous rate of change (slope of the tangent line at $x$).",
              "**Power Rule**: $\\frac{d}{dx}[x^n] = n x^{n-1}$; derivative of a constant is $0$.",
              "**Chain Rule**: derivative of the outside function times derivative of the inside function."
            ],
            "quiz": {
              "topic": "Differential Calculus: Derivatives & Tangent Lines",
              "questions": [
                {
                  "question": "What is the derivative of $f(x) = 5x^3 - 2x + 8$?",
                  "options": [
                    "$15x^2 - 2$",
                    "$15x^3 - 2$",
                    "$5x^2 - 2$",
                    "$15x^2 + 8$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "Power rule: $3(5)x^2 - 2 + 0 = 15x^2 - 2$."
                },
                {
                  "question": "What is $\\frac{d}{dx}[\\sin(x)]$?",
                  "options": [
                    "$\\cos(x)$",
                    "$-\\cos(x)$",
                    "$\\tan(x)$",
                    "$\\sec^2(x)$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "The derivative of $\\sin(x)$ is $\\cos(x)$."
                },
                {
                  "question": "If position is $s(t) = t^2 + 4t$, what is the instantaneous velocity $v(t) = s'(t)$ at $t = 3$?",
                  "options": [
                    "10",
                    "21",
                    "6",
                    "7"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$v(t) = 2t + 4 \\implies v(3) = 10$."
                }
              ]
            },
            "xpReward": 350
          }
        ]
      },
      {
        "id": "g12-optimization-diffeq",
        "grade": 12,
        "stage": "high",
        "title": "Optimization, Related Rates & Differential Equations",
        "domain": "Calculus: Applications (C.DER)",
        "standardCode": "C.DER.3",
        "description": "Use first and second derivatives to find maxima, minima, and inflection points, solve optimization problems, and separate differential equations.",
        "icon": "🏆",
        "xpReward": 360,
        "lessons": [
          {
            "id": "g12-l4-optimization",
            "topicId": "g12-optimization-diffeq",
            "grade": 12,
            "title": "Critical Points, Optimization & Separable Differential Equations",
            "standard": {
              "code": "C.DER.3.1",
              "domain": "Calculus: Applications (C.DER)",
              "description": "Locate relative and absolute extrema using derivatives and solve separable differential equations dy/dx = g(x)h(y).",
              "grade": 12
            },
            "objectives": [
              "Find critical points where $f'(x) = 0$ or $f'(x)$ is undefined.",
              "Use the First and Second Derivative Tests to classify maxima, minima, and concavity.",
              "Solve real-world optimization problems and separable differential equations."
            ],
            "scenes": [
              {
                "id": "g12-l4-optimization-s1",
                "title": "Step 1: Critical Points & Increasing/Decreasing Intervals",
                "conceptStep": 1,
                "totalSteps": 3,
                "narration": "Where a smooth curve reaches a peak (local maximum) or valley (local minimum), its slope temporarily flattens to f'(x) = 0!",
                "explanation": "- Where $f'(x) > 0$, $f(x)$ is **increasing**.\n- Where $f'(x) < 0$, $f(x)$ is **decreasing**.\n- Where $f'(x)$ changes from $+$ to $-$, $f$ has a **local maximum**.",
                "formula": "$$f'(c) = 0 \\implies \\text{Critical Point at } x = c$$",
                "workedExample": {
                  "problem": "Find the critical points of $f(x) = x^3 - 12x$.",
                  "steps": [
                    "Compute derivative: $f'(x) = 3x^2 - 12$.",
                    "Set $3x^2 - 12 = 0 \\implies x^2 = 4 \\implies x = -2$ and $x = 2$."
                  ],
                  "answer": "x = -2 (local max) and x = 2 (local min)"
                },
                "quickCheck": {
                  "question": "If $f'(x) < 0$ on the interval $(1, 5)$, what is $f(x)$ doing on $(1, 5)$?",
                  "options": [
                    "Decreasing",
                    "Increasing",
                    "Constant",
                    "Vertical"
                  ],
                  "correctIndex": 0,
                  "explanation": "Negative derivative means negative slope, so f(x) is decreasing."
                },
                "visualType": "riemann_sum",
                "caption": "Critical points where tangent slope equals zero."
              },
              {
                "id": "g12-l4-optimization-s2",
                "title": "Step 2: Applied Optimization & Concavity (f''(x))",
                "conceptStep": 2,
                "totalSteps": 3,
                "narration": "To maximize the area of a rectangular field with 100 m of fencing (2x + 2y = 100), write Area A(x) = x(50 - x), set A'(x) = 50 - 2x = 0, and get x = 25 m!",
                "explanation": "The second derivative $f''(x)$ measures **concavity**: $f''(c) < 0$ confirms the curve bends downward like a frown, proving $c$ is a maximum!",
                "formula": "$$A(x) = 50x - x^2 \\implies A'(x) = 50 - 2x = 0 \\implies x = 25$$",
                "workedExample": {
                  "problem": "A ball's height is $h(t) = -16t^2 + 64t + 5$. At what time $t$ does it reach maximum height?",
                  "steps": [
                    "Set velocity $h'(t) = -32t + 64 = 0$.",
                    "Solve: $32t = 64 \\implies t = 2$ seconds."
                  ],
                  "answer": "t = 2 seconds"
                },
                "quickCheck": {
                  "question": "If $f'(c) = 0$ and $f''(c) = -8 < 0$, what occurs at $x = c$?",
                  "options": [
                    "A local maximum (concave down)",
                    "A local minimum (concave up)",
                    "An inflection point",
                    "A vertical asymptote"
                  ],
                  "correctIndex": 0,
                  "explanation": "Horizontal tangent + concave down (f'' < 0) means a local maximum."
                },
                "visualType": "riemann_sum",
                "caption": "Maximizing an objective function."
              },
              {
                "id": "g12-l4-optimization-s3",
                "title": "Step 3: Differential Equations & Slope Fields",
                "conceptStep": 3,
                "totalSteps": 3,
                "narration": "A differential equation like dy/dx = 2x connects a function to its own derivative! Separate variables (dy = 2x dx) and integrate both sides!",
                "explanation": "When the rate of change is proportional to the amount present ($\\frac{dy}{dt} = ky$), separating variables gives exponential growth/decay $y = Ce^{kt}$.",
                "formula": "$$\\frac{dy}{dx} = g(x)h(y) \\implies \\int \\frac{1}{h(y)}\\,dy = \\int g(x)\\,dx$$",
                "workedExample": {
                  "problem": "Solve $\\frac{dy}{dx} = 4x$ with initial condition $y(0) = 3$.",
                  "steps": [
                    "Integrate: $y = \\int 4x\\,dx = 2x^2 + C$.",
                    "Plug in $(0, 3)$: $3 = 2(0)^2 + C \\implies C = 3$. Solution: $y = 2x^2 + 3$."
                  ],
                  "answer": "y = 2x² + 3"
                },
                "quickCheck": {
                  "question": "What is the general solution to $\\frac{dy}{dt} = 5y$?",
                  "options": [
                    "y = C e⁵ᵗ",
                    "y = 5t + C",
                    "y = 5y² / 2",
                    "y = C ln(5t)"
                  ],
                  "correctIndex": 0,
                  "explanation": "Rate proportional to y always yields exponential solution y = Ce^(kt)."
                },
                "visualType": "riemann_sum",
                "caption": "Solution curves through a differential slope field."
              }
            ],
            "takeaways": [
              "At a local maximum or minimum, the tangent line is horizontal ($f'(x) = 0$).",
              "$f''(x) > 0 \\implies$ concave up (local minimum); $f''(x) < 0 \\implies$ concave down (local maximum).",
              "For $\\frac{dy}{dt} = ky$, the general solution is exponential: $y(t) = C e^{kt}$."
            ],
            "quiz": {
              "topic": "Optimization, Related Rates & Differential Equations",
              "questions": [
                {
                  "question": "At a smooth local maximum of $f(x)$, what is $f'(x)$?",
                  "options": [
                    "0",
                    "1",
                    "$-1$",
                    "$\\infty$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "The tangent line is horizontal at a smooth peak, so $f'(x) = 0$."
                },
                {
                  "question": "If $f(x) = x^2 - 8x + 10$, at what $x$ does the minimum occur?",
                  "options": [
                    "$x = 4$",
                    "$x = 8$",
                    "$x = -4$",
                    "$x = 10$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "$f'(x) = 2x - 8 = 0 \\implies x = 4$."
                },
                {
                  "question": "If $\\frac{dy}{dx} = 3x^2$ and $y(0) = 7$, what is $y(x)$?",
                  "options": [
                    "$y = x^3 + 7$",
                    "$y = 6x + 7$",
                    "$y = 3x^3 + 7$",
                    "$y = x^3$"
                  ],
                  "correctAnswerIndex": 0,
                  "explanation": "Antiderivative of $3x^2$ is $x^3 + C$, and $y(0)=7 \\implies C=7$."
                }
              ]
            },
            "xpReward": 360
          }
        ]
      }
    ]
  }
];

/**
 * Utility helpers to retrieve curriculum by grade, topic, or lesson
 */
export const getCurriculumForGrade = (grade: number): GradeCurriculum | undefined => {
  return GEORGIA_CURRICULUM.find(c => c.grade === grade);
};

export const getLessonById = (lessonId: string): CurriculumLesson | undefined => {
  for (const grade of GEORGIA_CURRICULUM) {
    for (const topic of grade.topics) {
      const lesson = topic.lessons.find(l => l.id === lessonId);
      if (lesson) return lesson;
    }
  }
  return undefined;
};

export const getAllLessons = (): CurriculumLesson[] => {
  const all: CurriculumLesson[] = [];
  for (const grade of GEORGIA_CURRICULUM) {
    for (const topic of grade.topics) {
      all.push(...topic.lessons);
    }
  }
  return all;
};
