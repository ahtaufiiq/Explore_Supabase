require('dotenv').config();
const {createClient} = require('@supabase/supabase-js')
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function read() {
    let { data: Todo, error } = await supabase
        .from('Todo')
        .select('*')
        console.log(Todo);
}
async function update(name) {
    const { data, error } = await supabase
        .from('Todo')
        .update({ name })
        .eq('name', 'Testing')
    
}

async function add(name) {
    const { data, error } = await supabase
        .from('Todo')
        .insert([
            { name },
        ])
}

async function listen() {
    const Todo = supabase
        .from('Todo')
        .on('*', payload => {
            switch (payload.eventType) {
                case "DELETE":
                    console.log(`Delete ${payload.old.id}`);
                    break;
                case "INSERT":
                    console.log(`Insert ${payload.new.name}`);
                    break;
                case "UPDATE":
                    console.log(`Update ${payload.new.name}`);
                    break;
            }
        })
        .subscribe()
        
}

async function deleteData(name) {
    const { data, error } = await supabase
        .from('Todo')
        .delete()
        .eq("name",name)
}


listen()


setTimeout(() => {
    update("Belajar")
    add("Testing")
    deleteData("Belajar")
    read()
}, 1000);