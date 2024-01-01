import { OutlinedInput, InputLabel, MenuItem, FormControl, ListItemText, Select, Checkbox } from '@mui/material';
export default function MultipleSelectCheckmarks({ problems, selectedProblems, onChange }) {
    return (
        <FormControl sx={{ my: 1 }} fullWidth >
            <InputLabel >Choose Problems</InputLabel>
            <Select
                multiple
                value={selectedProblems}
                onChange={onChange}
                input={<OutlinedInput label="Choose Problems" />}
                renderValue={(selected) => selected.join(', ')}
            >
                {problems.map((problem) => (
                    <MenuItem key={problem._id} value={problem.title}>
                        <Checkbox checked={selectedProblems.indexOf(problem.title) > -1} />
                        <ListItemText primary={problem?.title} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}