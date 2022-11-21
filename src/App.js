import logo from './logo.svg';
import { css } from '@emotion/css'
import { useEffect, useState } from 'react';

//Components
import Board from './components/ui/Board'
import { Plus } from 'react-feather'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css



function App() {
  const main = [
    {
      id: Date.now() + Math.random() * 4,
      key: "To Do",
      cards: [{
          id: Date.now() + Math.random() * 4,
          title: "Design new form",
          description: "New form about yaroa.",
          tag: "Long form",
          assignee: "Pablo",
          duedate: "2023-01-01"
      },
      {
        id: Date.now() + Math.random() * 4,
        title: "Design new form",
        description: "New form of social media.",
        tag: "Long form",
        assignee: "Pablo",
        duedate: "2023-01-01"
      },
      ]
    },
    {
      id: Date.now() + Math.random() * 4,
      key: "In process",
      cards: [{
        id: Date.now() + Math.random() * 4,
        title: "Write post",
        description: "Write new article",
        tag: "Blog Post",
        assignee: "Eric",
        duedate: "2022-12-07"
      }]
    },
    {
      id: Date.now() + Math.random() * 4,
      key: "Done",
      cards: [{
        id: Date.now() + Math.random() * 4,
        title: "Monitor backlink",
        description: "Check backlinks",
        tag: "SEO",
        assignee: "Bryant",
        duedate: "2022-11-29"
      }]
    }
  ]
  const [boards, setBoards] = useState(
    JSON.parse(localStorage.getItem("main")) || main
  );

  const [targetCard, setTargetCard] = useState({
    bid: "",
    cid: "",
  });

  const removeCard = (bid, cid) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            const index = boards.findIndex((item) => item.id === bid);
            if (index < 0) return;

            const tempBoards = [...boards];
            const cards = tempBoards[index].cards;

            const cardIndex = cards.findIndex((item) => item.id === cid);
            if (cardIndex < 0) return;

            cards.splice(cardIndex, 1);
            console.log(1)
            setBoards(tempBoards);
          }
        },
        {
          label: 'No'
        }
      ]
    });

  };

  const dragEnded = (bid, cid) => {
    let s_boardIndex, s_cardIndex, t_boardIndex, t_cardIndex;
    s_boardIndex = boards.findIndex((item) => item.id === bid);
    if (s_boardIndex < 0) return;

    s_cardIndex = boards[s_boardIndex]?.cards?.findIndex(
      (item) => item.id === cid
    );
    if (s_cardIndex < 0) return;

    t_boardIndex = boards.findIndex((item) => item.id === targetCard.bid);
    if (t_boardIndex < 0) return;

    console.log(targetCard)

    t_cardIndex = boards[t_boardIndex]?.cards?.findIndex(
      (item) => item.id === targetCard.cid
    );
    if (t_cardIndex < 0) return;

    const tempBoards = [...boards];
    const sourceCard = tempBoards[s_boardIndex].cards[s_cardIndex];
    console.log(tempBoards[s_boardIndex], tempBoards[t_boardIndex])
    tempBoards[s_boardIndex].cards.splice(s_cardIndex, 1);
    tempBoards[t_boardIndex].cards.splice(t_cardIndex, 0, sourceCard);
    setBoards(tempBoards);

    setTargetCard({
      bid: "",
      cid: "",
    });
  };

  const dragEntered = (bid, cid) => {
    console.log(targetCard.bid, bid)
    if (targetCard.cid === cid) return;
    setTargetCard({
      bid,
      cid,
    });
  };

  const updateCard = (bid, cid, card) => {
    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...boards];
    const cards = tempBoards[index].cards;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    tempBoards[index].cards[cardIndex] = card;

    setBoards(tempBoards);
  };
  const addNewCard = () => {
    const newCard = {
      id: Date.now() + Math.random() * 4,
      title: "",
      description: "",
      tag: "",
      assignee: "",
      duedate: ""
    }
    const tempBoards = [...boards];

    tempBoards[0].cards.push(newCard)
    setBoards(tempBoards);

  }

  useEffect(() => {
    localStorage.setItem("main", JSON.stringify(boards));
  }, [boards])

  return (
    <div className={css`height: 100vh; width: 100%; display: flex; flex-direction: column; border-radius: 4px; gap:20px;`}>
      <div className={css`display: flex; justify-content: space-between; align-items: center;`}>
        <div className={css`width:100%; padding: 32px; font-size: 24px;  padding:20px 30px; border-bottom: 1px solid #ccc; border-radius: 4px;
                &:hover {
                    color: green;
                }
            `}>
          <h3>Kanban Board</h3>
        </div>
      </div>

      <div className={css` padding: 20px;`} >
        <div>
          <button onClick={addNewCard} className={css` margin-bottom: 20px; padding: 6px 12px;  border-radius: 7px;  background-color: #eee; color: #000; cursor: pointer; width: fit-content; transition: 200ms;`}>
            <Plus className={css`color: green; width:15px; height:15px; `} />
            Add item</button>
        </div>
      </div>
      <div className={css`flex: 1; width: 100%; height: 100%; overflow-x: auto; padding-top: 20px;`} >
        <div className={css`height: 100%;  width: fit-content; padding: 10px 30px; display: flex; gap: 30px;`} >
          {boards.map(board =>
            <Board
              key={board.id}
              board={board}
              removeCard={removeCard}
              dragEnded={dragEnded}
              dragEntered={dragEntered}
              updateCard={updateCard}
            />
          )}

        </div>
      </div>


    </div>

  );
}

export default App;
