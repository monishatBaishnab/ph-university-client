import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { Button, Table, TableColumnsType, TableProps } from "antd";
import { TAcademicSemester } from "../../../types";
import { useState } from "react";
import { yearFilters } from "../../../constants/academicSemesters";
import { useGetAllStudentQuery } from "../../../redux/features/admin/userManagement.api";

type TTableData = Pick<TAcademicSemester, "name" | "year" | "startMonth" | "endMonth"> & {
    key: string;
};

type TParam = { name: string; value: string };

const StudentsData = () => {
    const [params, setParams] = useState<TParam[]>([]);
    const { data: academicSemesters } = useGetAllSemestersQuery(params);
    const { data: studentsData } = useGetAllStudentQuery(params);
    console.log(studentsData);

    const columns: TableColumnsType<TTableData> = [
        {
            title: "Name",
            dataIndex: "name",
            showSorterTooltip: { target: "full-header" },
            filters: [
                {
                    text: "Autumn",
                    value: "Autumn",
                },
                {
                    text: "Summer",
                    value: "Summer",
                },
                {
                    text: "Fall",
                    value: "Fall",
                },
            ],
        },
        {
            title: "Year",
            dataIndex: "year",
            filters: yearFilters,
        },
        {
            title: "Start Month",
            dataIndex: "startMonth",
        },
        {
            title: "End Month",
            dataIndex: "endMonth",
        },
        {
            title: "Action",
            dataIndex: "",
            key: "x",
            render: () => (
                <Button size="middle" type="dashed">
                    Update
                </Button>
            ),
        },
    ];

    const tableData = academicSemesters?.data?.map(({ _id, name, year, startMonth, endMonth }) => ({
        key: _id,
        name,
        year,
        startMonth,
        endMonth,
    }));

    const onChange: TableProps<TTableData>["onChange"] = (_pagination, filters, _sorter, extra) => {
        if (extra.action === "filter") {
            const queryParams: TParam[] = [];
            filters?.name?.forEach((item) =>
                queryParams.push({ name: "name", value: item as string })
            );
            filters?.year?.forEach((item) =>
                queryParams.push({ name: "year", value: item as string })
            );
            setParams(queryParams);
        }
    };

    return (
        <div>
            <h1 style={{ marginBottom: "40px" }}>Students Data</h1>

            <Table
                columns={columns}
                dataSource={tableData}
                onChange={onChange}
                showSorterTooltip={{ target: "sorter-icon" }}
            />
        </div>
    );
};

export default StudentsData;
