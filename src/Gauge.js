import { useState } from "react";
import GaugeChart from "react-gauge-chart";
import Form from "./Form.js"

function Gauge() {
    var leng = 0;
    var partition_arr = [];
    //var col_arr = ["#90EE90", "#90EE90", "#90EE90", "#90EE90"];         //#FFA500
    var col_arr = []
    var percent_val = 0;
    var quartile_val = 0;

    const [globalPartition, setGlobalPartition] = useState([1, 1, 1, 1]);
    const [globalColour, setGlobalColour] = useState([1, 1, 1]);
    const [indicatorPercent, setIndicatorPercent] = useState(1);
    const [indicatorColour, setIndicatorColour] = useState(1);

    const updateParams = (data) => {
        partition_arr = [];                                                         // Empty the array.
        var partion_val = parseInt(data.scale) / 4;
        var idx = parseInt(data.target) / partion_val;                   // getting the lower value in case of fractions
        var quart_idx = 0;
        if ((idx % 1) === 0) {
            quart_idx = idx - 1;
        }
        else {
            quart_idx = Math.floor(idx);
        }
        var new_idx = quart_idx - 1;
        var partition_leng = 1 / partion_val;
        var counter = 1;
        leng = partion_val;                                                     // Length of the array to form.
        quartile_val = quart_idx + 1;                                               // Quartile on which the target lies.
        var data_val = parseInt(data.val)
        var val_quartile = (data_val / partion_val);
        var val_idx = 0;
        if ((val_quartile % 1) === 0) {
            val_idx = val_quartile - 1;
        }
        else {
            val_idx = Math.floor(data_val / partion_val)
        }

        if (val_idx == quart_idx){
            percent_val = ((0.25 / partion_val) * (data_val - 1)) + ((0.25 / partion_val) / 2);
        }
        else {
            percent_val = (0.25 * (quart_idx - 1)) + (0.25 / 2);
        }
        console.log('Partition Length', partition_leng);
        console.log('Quartil Index', quart_idx);
        console.log(data)
        // Set indicator colour
        if (parseInt(data.target) < data_val) {
            setIndicatorColour("#90EE90")
        }
        else {
            setIndicatorColour("#FFA500")
        }

        for (let i = 0; i < 4; i++) {
            console.log("counter", counter)
            if (i === quart_idx) {
                console.log(i);
                // Append based on partition.
                for (var j = 0; j < partion_val; j++) {
                    if (counter < parseInt(data.target)) {
                        col_arr.push("#FFA500")                 // Add orange
                    }
                    else {
                        col_arr.push("#90EE90")                 // Add green
                    }
                    partition_arr.push(partition_leng)

                    counter += 1;
                }
            }
            else {
                if (counter < parseInt(data.target)) {
                    col_arr.push("#FFA500")                 // Add orange
                }
                else {
                    col_arr.push("#90EE90")                 // Add green
                }

                partition_arr.push(1);
                counter += partion_val;
            }
        }
        //}
        setGlobalPartition(partition_arr);
        console.log(col_arr);
        setGlobalColour(col_arr);
        setIndicatorPercent(percent_val);
    }

    return (
        <div className="Gauge">
            <Form func={updateParams} />
            <GaugeChart
                id="gauge-chart"
                textColor="#333"
                //nrOfLevels={leng}
                arcsLength={globalPartition}
                colors={globalColour}
                hideText={true}
                percent={indicatorPercent}
                needleColor={indicatorColour}
                needleBaseColor={indicatorColour}
                arcPadding={0.02}
                text
            />
        </div>
    );
}

export default Gauge;