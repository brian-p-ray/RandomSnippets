<?php
$argv = [];

fwrite(STDOUT, 'Please enter the characters you want (upper, lower, number, or all).'."\n");
$handle = fopen("php://stdin","r");
$argv[1] = trim(fgets($handle));

fwrite(STDOUT, 'Please enter the length of the string you require.'."\n");
$handle = fopen("php://stdin","r");
$argv[2] = trim(fgets($handle));

	if($argv[1] == 'all')
	{
		$argv[1] = 'upper lower number';
	}

	$types = explode(' ', $argv[1]); // upper, lower, number, all - can be multiples
	$length = $argv[2];

	$characters = '';
	$lower = 'abcdefghijklmnopqrstuvwxyz';
	$upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	$number = '0123456789';
	$output = '';

	foreach($types as $type)
	{
		$characters .= $$type;
	}
	$charLength = strlen($characters);

	for ($i = 0; $i < $length; $i++) {
        $output .= $characters[rand(0, $charLength - 1)];
    }

    fwrite(STDOUT, $output);