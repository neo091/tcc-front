import { Card, CardContent } from "./Card";
import { MultipleChoice, TrueFalseItem, Typing } from "./ExamTypes";

const ExamGeneratedList = (
  {
    handleDeleteExam,
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
                  type === "multiple_choice" && <MultipleChoice handleDeleteExam={handleDeleteExam} item={item} examIndex={examIndex} editAskHandle={editAskHandle} editPointsHandle={editPointsHandle} editCorrectAnswerHandle={editCorrectAnswerHandle} editAnswerHandle={editAnswerHandle} removeAnswerHandle={removeAnswerHandle} />
                }

                {
                  type === "true_false" && <TrueFalseItem handleDeleteExam={handleDeleteExam} item={item} examIndex={examIndex} editAskHandle={editAskHandle} editPointsHandle={editPointsHandle} editCorrectAnswerHandle={editCorrectAnswerHandle} />
                }

                {
                  type === "typing" && <Typing handleDeleteExam={handleDeleteExam} item={item} examIndex={examIndex} editAskHandle={editAskHandle} editPointsHandle={editPointsHandle} editCorrectAnswerHandle={editCorrectAnswerHandle} />
                }

                {
                  type === "typingImage" && <Image handleDeleteExam={handleDeleteExam} item={item} examIndex={examIndex} editAskHandle={editAskHandle} editPointsHandle={editPointsHandle} editCorrectAnswerHandle={editCorrectAnswerHandle} />
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
