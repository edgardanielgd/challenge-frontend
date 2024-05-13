import { toast } from "react-toastify";
import { useState } from "react";
import { deleteCategoryById } from "../../services/category";
import { removeCategoryFromNote } from "../../services/note";
import Loading from "./Loading";

export function CategoryBadge({ category, onCategoryDelete, onCategoryClick, parentNoteId, selected }) {

    const { cat_name: name, cat_color: color } = category;

    const [loading, setLoading] = useState(false);

    const handleDelete = () => {
        if (parentNoteId) {
            removeCategoryFromNote(parentNoteId, category.cat_id).then(() => {
                toast.success("Category removed from note");
                onCategoryDelete(category);
                setLoading(false);
            }
            ).catch((error) => {
                console.log(error)
                toast.error("Error removing category from note");
                setLoading(false);
            });
        } else {
            deleteCategoryById(category.cat_id).then(() => {
                toast.success("Category deleted successfully");
                onCategoryDelete(category);
                setLoading(false);
            }
            ).catch((error) => {
                console.log(error)
                toast.error("Error deleting category");
                setLoading(false);
            });
        }

    }

    // https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
    var r = parseInt(color.substr(1, 2), 16);
    var g = parseInt(color.substr(3, 2), 16);
    var b = parseInt(color.substr(5, 2), 16);
    var brightness = Math.round(((r * 299) + (g * 587) + (b * 114)) / 1000);

    return <div
        className="category-badge text-center"
        style={{
            width: (parentNoteId) ? "100%" : "100%",
            backgroundColor: `rgba(${r},${g},${b},${(selected || parentNoteId) ? 1 : 0.5})`,
            color: (brightness > 125) ? "black" : "white"
        }}
    >
        {
            loading ? <Loading /> :
                <>
                    <div style={{
                        backgroundColor: (brightness <= 125) ? `rgba(255,255,255,0.2)` : `rgba(0,0,0,0.2)`
                    }}
                        onClick={handleDelete}
                    > X </div>
                    <div onClick={onCategoryClick && onCategoryClick}>
                        {name}
                    </div>
                </>
        }
    </div>
}