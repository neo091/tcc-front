import { Card, CardContent } from "./Card";
import { MultipleChoice, TrueFalseItem, Typing } from "./ExamTypes";

const ExamGeneratedList = (
  {
    saveHandle,
    examList,
    editAnswerHandle,
    editAskHandle,
    removeAnswerHandle,
    editCorrectAnswerHandle,
    editPointsHandle
  }
) => {
  return (
    examList && examList.length > 0
      ?
      <>
        {
          examList.map((item, examIndex) => {

            const { type, ask } = item

            return (
              <div key={ask}>
                {
                  type === "multiple_choice" && <MultipleChoice item={item} examIndex={examIndex} editAskHandle={editAskHandle} editPointsHandle={editPointsHandle} editCorrectAnswerHandle={editCorrectAnswerHandle} editAnswerHandle={editAnswerHandle} removeAnswerHandle={removeAnswerHandle} />
                }

                {
                  type === "true_false" && <TrueFalseItem item={item} examIndex={examIndex} editAskHandle={editAskHandle} editPointsHandle={editPointsHandle} editCorrectAnswerHandle={editCorrectAnswerHandle} />
                }

                {
                  type === "typing" && <Typing item={item} examIndex={examIndex} editAskHandle={editAskHandle} editPointsHandle={editPointsHandle} editCorrectAnswerHandle={editCorrectAnswerHandle} />
                }

                {
                  type === "typingImage" && <Image item={item} examIndex={examIndex} editAskHandle={editAskHandle} editPointsHandle={editPointsHandle} editCorrectAnswerHandle={editCorrectAnswerHandle} />
                }
              </div>

            )
          })
        }

        <Card>
          <CardContent>
            <button onClick={saveHandle} className='inline-block p-2 shadow-sm shadow-black bg-sky-600 w-full'>GUARDAR</button>
          </CardContent>
        </Card>
      </> : ""

  )
}

export default ExamGeneratedList;
