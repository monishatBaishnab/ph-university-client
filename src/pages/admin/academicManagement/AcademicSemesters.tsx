import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { Table, TableColumnsType, TableProps } from "antd";
import { TAcademicSemester } from "../../../types";
import { useState } from "react";
import { yearFilters } from "../../../constants/semesters";

type TTableData = Pick<TAcademicSemester, "name" | "year" | "startMonth" | "endMonth"> & {
    key: string;
};

type TParam = { name: string; value: string };

const AcademicSemesters = () => {
    const [params, setParams] = useState<TParam[]>([]);
    const { data: academicSemesters } = useGetAllSemestersQuery(params);
    console.log(params);
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
    ];

    const tableData = academicSemesters?.data?.map(({ _id, name, year, startMonth, endMonth }) => ({
        key: _id,
        name,
        year,
        startMonth,
        endMonth,
    }));
    const onChange: TableProps<TTableData>["onChange"] = (pagination, filters, sorter, extra) => {
        console.log(filters);
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
            <h1 style={{ marginBottom: "40px" }}>Academic Semesters</h1>

            <Table
                columns={columns}
                dataSource={tableData}
                onChange={onChange}
                showSorterTooltip={{ target: "sorter-icon" }}
            />
        </div>
    );
};

export default AcademicSemesters;
