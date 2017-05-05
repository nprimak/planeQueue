<h1>Aircraft Control System</h1>

<p>An application to manage aircraft in a queue. 
Launch system button turns everything on.
To queue aircraft you must assign type and size, then press 'queue' button. 
Dequeue aircraft button will appear once you have queued an aircraft.
Go to 'view aircraft' tab to see current list of aircrafts you have queued. 

</p>

<p>
Dequeue aircraft requests result in selection of one AC for removal such that:
<ul>
<li>Passenger AC’s have removal precedence over Cargo AC’s</li>
<li>Large AC’s of a given type have removal precedence over Small AC’s of the same type.</li>
<li>Earlier enqueued AC’s of a given type and size have precedence over later enqueued AC’s of the same type and size.</li>
</ul>
</p>
This project uses Angular and Sass. 
sass --watch styles.scss:styles.css  to compile sass 
