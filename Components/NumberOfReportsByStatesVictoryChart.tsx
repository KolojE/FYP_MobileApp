import React from "react";
import { VictoryAxis, VictoryChart, VictoryGroup, VictoryLegend, VictoryBar, VictoryLabel } from "victory-native";
import { getContrastColor, getRandomColor } from "../utils/colors";

type VictoryBarData =
    {
        [key: string]: {
            x: string,
            y: number
        }[]
    }

type NumberOfReportByStateVictoryChartProps = {
    victoryBarData: VictoryBarData
}

export default function NumberOfReportByStateVictoryChart({ victoryBarData }: NumberOfReportByStateVictoryChartProps) {


    const colors = []


    const {
        victoryBar,
        legendData
    } = React.useMemo(() => {

        let legendData = []
        let victoryBar: JSX.Element[] = []

        Object.keys(victoryBarData).forEach((state, index) => {
            const data = []

            const color = getRandomColor()
            colors.push(color)
            victoryBarData[state].forEach((item) => {
                data.push({
                    x: item.x,
                    y: item.y,
                    fill: color
                })
            })

            victoryBar.push(<VictoryBar
                colorScale={colors}
                data={data}
                style={{
                    labels: {
                        fontSize: 10,
                        fill:getContrastColor(color)
                    }
                }}
                labels={({ datum }) => `${datum.y}`}
                labelComponent={<VictoryLabel dy={0} dx={-20} />}
            />
            )

            legendData.push({
                name: state,
                symbol: {
                    fill: color
                }
            })
        }
        )
        return {
            victoryBar,
            legendData
        }
    }, [victoryBarData])

            return (
        <>
            <VictoryChart
                horizontal
                width={400}
                height={300}
                padding={{ left: 60, top: 50, bottom: 50, right: 50 }}
            >

                <VictoryGroup offset={10}
                    colorScale={"qualitative"}
                    style={{
                        labels: {
                            fontSize: 5,
                            fontWeight: "bold",
                            width: 50,
                        }
                    }}
                >
                    {victoryBar}
                </VictoryGroup>
                <VictoryAxis
                    dependentAxis
                    style={{
                        axisLabel: {
                            fontSize: 12,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        },
                        tickLabels: {
                            fontSize: 8,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        },
                    }}
                    tickFormat={(x) => {
                        return `${Number.isInteger(x) ? x :""}`;
                    }}

                />
                <VictoryAxis
                    style={{
                        axisLabel: {
                            fontSize: 12,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        },
                        tickLabels: {
                            fontSize: 8,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        },
                    }}
                />
            </VictoryChart>
            <VictoryLegend
                data={legendData}
                rowGutter={10}
            />
        </>
    )
}