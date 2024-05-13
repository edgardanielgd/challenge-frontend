import { Dropdown } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import { addCategoryToNote } from "../../services/note";
import Loading from "./Loading";

export default function AddNoteCategory({ noteId, categories, onNoteCategoryAdd }) {
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event, categoryId) => {
        event.preventDefault();
        setLoading(true);
        addCategoryToNote(noteId, categoryId).then((response) => {
            toast.success("Category added to note successfully");
            onNoteCategoryAdd(response);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
            toast.error("Error adding category to note");
            setLoading(false);
        });
    }

    return (
        <Dropdown
            className="note-add-category-dropdown"
        >
            {loading ? <Loading /> :
                <>
                    <Dropdown.Toggle
                        className="note-add-category-dropdown-toggle"
                    >
                        + Add Category
                    </Dropdown.Toggle>
                    {
                        <Dropdown.Menu>
                            {
                                categories && categories.map(category => (
                                    <Dropdown.Item
                                        key={"cat_item_" + category.cat_id}
                                        onClick={(event) => handleSubmit(event, category.cat_id)}
                                        className="note-add-category-dropdown-item"
                                    >
                                        {category.cat_name}
                                    </Dropdown.Item>
                                ))
                            }
                        </Dropdown.Menu>
                    }
                </>
            }


        </Dropdown>
    );
}