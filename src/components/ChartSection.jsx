

import React from 'react';
import Chart from "react-apexcharts";
import { Card, CardTitle } from './Card';
import Exam from './Exam';


const ChartSection = () => {

  return (
    <div className="grid grid-cols-12 gap-6 ">
      <Card extraCss={'col-span-12 xl:col-span-8'}>
        <div className='p-6'>
          <CardTitle>Lista de los exámenes en curso</CardTitle>

          <Exam />

        </div>
      </Card>
    </div>
  );
}

export default ChartSection;