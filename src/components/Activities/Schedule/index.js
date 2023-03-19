import React, {useState} from 'react';
import withContext from "../../../withContext";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import DataTable from 'react-data-table-component';
import 'resize-observer-polyfill/dist/ResizeObserver.global';
import { TimeGridScheduler, classes } from 'react-weekly-scheduler';
import 'react-weekly-scheduler/build/index.css';

const Schedule = props => {
    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
        },
        {
            name: 'Year',
            selector: row => row.year,
        },
    ];
    
    const data = [
        {
            id: 1,
            title: 'Beetlejuice',
            year: '1988',
        },
        {
            id: 2,
            title: 'Ghostbusters',
            year: '1984',
        },
    ]

    const rangeStrings = [
        ['2019-03-04 00:15', '2019-03-04 01:45'],
        ['2019-03-05 09:00', '2019-03-05 10:30'],
        ['2019-03-06 22:00', '2019-03-06 22:30'],
        ['2019-03-07 01:30', '2019-03-07 03:00'],
        ['2019-03-07 05:30', '2019-03-07 10:00'],
        ['2019-03-08 12:30', '2019-03-08 01:30'],
        ['2019-03-09 22:00', '2019-03-09 23:59'],
      ];
      
      const defaultSchedule = rangeStrings.map(range =>
        range.map(dateString => new Date(dateString)),
      );

      const [schedule, setSchedule] = useState(defaultSchedule);
    
    return (
        <div className="hero">
            <div className="card">
                <Tabs>
                    <div className="message">
                        <div className="message-header">
                            <TabList className="has-text-centered">
                                <Tab> Table </Tab>
                                <Tab> Calendar </Tab>
                            </TabList>
                        </div>
                        <div className="message-body">
                            <TabPanel>
                                <DataTable
                                    columns={columns}
                                    data={data}
                                />
                            </TabPanel>
                            <TabPanel>
                                {
                                    
                                    <TimeGridScheduler
                                        classes={classes}
                                        originDate={new Date('2019-03-04')}
                                        schedule={schedule}
                                        onChange={setSchedule}
                                        />
                                    
                                }

                            </TabPanel>
                        </div>
                    </div>
                </Tabs>
            </div>
        </div>
    )
}

export default withContext(Schedule);
